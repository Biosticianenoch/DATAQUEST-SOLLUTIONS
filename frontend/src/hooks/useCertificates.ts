import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';

export const useCertificates = () => {
  const { courseNFT, account } = useWeb3();
  const [certificates, setCertificates] = useState<Array<{ id: number; courseId: number; uri: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    if (!courseNFT || !account) return;
    try {
      const balance = await courseNFT.balanceOf(account);
      const certificates = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await courseNFT.tokenOfOwnerByIndex(account, i);
        const courseId = await courseNFT.getCourseId(tokenId);
        const uri = await courseNFT.tokenURI(tokenId);
        certificates.push({ id: tokenId, courseId, uri });
      }

      setCertificates(certificates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificates');
    }
  }, [courseNFT, account]);

  const hasCertificate = useCallback(async (courseId: number) => {
    if (!courseNFT || !account) return false;
    try {
      return await courseNFT.hasCertificate(account, courseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check certificate');
      return false;
    }
  }, [courseNFT, account]);

  const getCertificateMetadata = useCallback(async (tokenId: number) => {
    if (!courseNFT) return null;
    try {
      const uri = await courseNFT.tokenURI(tokenId);
      const response = await fetch(uri);
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificate metadata');
      return null;
    }
  }, [courseNFT]);

  return {
    certificates,
    loading,
    error,
    fetchCertificates,
    hasCertificate,
    getCertificateMetadata,
  };
}; 