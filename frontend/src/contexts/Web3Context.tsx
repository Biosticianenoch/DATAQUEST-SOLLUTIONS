import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { DataQuestToken__factory } from '../types/ethers-contracts';
import { CourseNFT__factory } from '../types/ethers-contracts';
import { LearningMarketplace__factory } from '../types/ethers-contracts';

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  account: string | null;
  dataQuestToken: any | null;
  courseNFT: any | null;
  learningMarketplace: any | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  dataQuestToken: null,
  courseNFT: null,
  learningMarketplace: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  error: null,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [dataQuestToken, setDataQuestToken] = useState<any | null>(null);
  const [courseNFT, setCourseNFT] = useState<any | null>(null);
  const [learningMarketplace, setLearningMarketplace] = useState<any | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask to use this feature');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      // Initialize contract instances
      const dataQuestTokenAddress = import.meta.env.VITE_DATAQUEST_TOKEN_ADDRESS;
      const courseNFTAddress = import.meta.env.VITE_COURSE_NFT_ADDRESS;
      const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;

      const dataQuestToken = DataQuestToken__factory.connect(dataQuestTokenAddress, signer);
      const courseNFT = CourseNFT__factory.connect(courseNFTAddress, signer);
      const learningMarketplace = LearningMarketplace__factory.connect(marketplaceAddress, signer);

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setDataQuestToken(dataQuestToken);
      setCourseNFT(courseNFT);
      setLearningMarketplace(learningMarketplace);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setDataQuestToken(null);
    setCourseNFT(null);
    setLearningMarketplace(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          connect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        dataQuestToken,
        courseNFT,
        learningMarketplace,
        connect,
        disconnect,
        isConnecting,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}; 