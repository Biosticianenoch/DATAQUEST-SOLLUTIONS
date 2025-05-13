import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';

export const useToken = () => {
  const { dataQuestToken, account } = useWeb3();
  const [balance, setBalance] = useState<string>('0');
  const [stakedAmount, setStakedAmount] = useState<string>('0');
  const [reward, setReward] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!dataQuestToken || !account) return;
    try {
      const balance = await dataQuestToken.balanceOf(account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance');
    }
  }, [dataQuestToken, account]);

  const fetchStakeInfo = useCallback(async () => {
    if (!dataQuestToken || !account) return;
    try {
      const stake = await dataQuestToken.stakes(account);
      setStakedAmount(ethers.utils.formatEther(stake.amount));
      const reward = await dataQuestToken.getReward();
      setReward(ethers.utils.formatEther(reward));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stake info');
    }
  }, [dataQuestToken, account]);

  const stake = useCallback(async (amount: string) => {
    if (!dataQuestToken) return;
    try {
      setLoading(true);
      setError(null);
      const amountWei = ethers.utils.parseEther(amount);
      const tx = await dataQuestToken.stake(amountWei);
      await tx.wait();
      await Promise.all([fetchBalance(), fetchStakeInfo()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stake tokens');
    } finally {
      setLoading(false);
    }
  }, [dataQuestToken, fetchBalance, fetchStakeInfo]);

  const unstake = useCallback(async () => {
    if (!dataQuestToken) return;
    try {
      setLoading(true);
      setError(null);
      const tx = await dataQuestToken.unstake();
      await tx.wait();
      await Promise.all([fetchBalance(), fetchStakeInfo()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unstake tokens');
    } finally {
      setLoading(false);
    }
  }, [dataQuestToken, fetchBalance, fetchStakeInfo]);

  return {
    balance,
    stakedAmount,
    reward,
    loading,
    error,
    stake,
    unstake,
    fetchBalance,
    fetchStakeInfo,
  };
}; 