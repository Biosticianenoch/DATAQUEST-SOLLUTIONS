import { Web3Storage } from 'web3.storage';

interface CourseMetadata {
  title: string;
  description: string;
  content: string;
  timestamp: number;
  version: string;
  materials?: MaterialMetadata[];
}

interface MaterialMetadata {
  name: string;
  type: string;
  size: number;
  cid: string;
}

interface CertificateMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

// Extend ImportMetaEnv
declare global {
  interface ImportMetaEnv {
    VITE_WEB3_STORAGE_TOKEN: string;
  }
}

class IPFSService {
  private client: Web3Storage;

  constructor() {
    const token = import.meta.env.VITE_WEB3_STORAGE_TOKEN;
    if (!token) {
      throw new Error('Web3.Storage token not found');
    }
    this.client = new Web3Storage({ token });
  }

  async uploadFile(file: File): Promise<string> {
    try {
      const cid = await this.client.put([file]);
      return `https://ipfs.io/ipfs/${cid}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }

  async uploadJSON(data: CourseMetadata | CertificateMetadata): Promise<string> {
    try {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const file = new File([blob], 'metadata.json');
      const cid = await this.client.put([file]);
      return `https://ipfs.io/ipfs/${cid}`;
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error);
      throw error;
    }
  }

  async uploadCourseContent(
    title: string,
    description: string,
    content: string,
    materials: File[]
  ): Promise<string> {
    try {
      const metadata: CourseMetadata = {
        title,
        description,
        content,
        timestamp: Date.now(),
        version: '1.0',
      };

      // Upload course materials
      const materialCIDs = await Promise.all(
        materials.map(async (file) => {
          const cid = await this.client.put([file]);
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            cid,
          };
        })
      );

      // Add material references to metadata
      metadata.materials = materialCIDs;

      // Upload metadata
      return await this.uploadJSON(metadata);
    } catch (error) {
      console.error('Error uploading course content:', error);
      throw error;
    }
  }

  async uploadCertificateMetadata(
    courseId: number,
    courseName: string,
    studentAddress: string,
    completionDate: number,
    score: number
  ): Promise<string> {
    const metadata: CertificateMetadata = {
      name: `${courseName} Certificate`,
      description: `Certificate of completion for ${courseName}`,
      image: `https://api.dataquest.com/certificates/${courseId}/image`, // Replace with actual certificate image generation
      attributes: [
        { trait_type: 'Course ID', value: courseId },
        { trait_type: 'Course Name', value: courseName },
        { trait_type: 'Student', value: studentAddress },
        { trait_type: 'Completion Date', value: completionDate },
        { trait_type: 'Score', value: score },
      ],
    };

    return await this.uploadJSON(metadata);
  }
}

export const ipfsService = new IPFSService(); 