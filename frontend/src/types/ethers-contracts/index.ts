
import { ethers } from 'ethers';

export interface ContractAddresses {
  DataQuestToken: string;
  CourseNFT: string;
  LearningMarketplace: string;
}

export const CONTRACT_ADDRESSES: ContractAddresses = {
  "DataQuestToken": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "CourseNFT": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "LearningMarketplace": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
};

export class DataQuestToken__factory {
  static connect(address: string, signerOrProvider: ethers.Signer | ethers.Provider) {
    return new ethers.Contract(address, [], signerOrProvider);
  }
}

export class CourseNFT__factory {
  static connect(address: string, signerOrProvider: ethers.Signer | ethers.Provider) {
    return new ethers.Contract(address, [], signerOrProvider);
  }
}

export class LearningMarketplace__factory {
  static connect(address: string, signerOrProvider: ethers.Signer | ethers.Provider) {
    return new ethers.Contract(address, [], signerOrProvider);
  }
}
