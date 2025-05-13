import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useWeb3 } from '@/contexts/Web3Context';
import { ethers } from 'ethers';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const RegisterPage: React.FC = () => {
  const { connect, account, signer, isConnecting, error: web3Error } = useWeb3();
  const navigate = useNavigate();

  // Web3 wallet signup handler
  const handleWalletSignup = async () => {
    try {
      await connect();
      if (!signer) throw new Error('No signer found');
      // You may want to fetch a nonce from your backend here for true security
      const message = 'Sign up for DataQuest Solutions';
      const signature = await signer.signMessage(message);
      // Optionally, send { address: account, signature } to your backend for registration
      toast({
        title: 'Wallet Signup Successful',
        description: `Welcome, ${account}`,
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Wallet Signup Failed',
        description: err.message || 'Could not sign up with wallet.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-800 to-blue-700 border-0 shadow-xl text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">Register with Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6 py-6">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-700 text-[#0f172a] text-lg font-semibold"
              onClick={handleWalletSignup}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting Wallet...' : 'Sign up with Wallet'}
            </Button>
            {web3Error && <div className="text-red-400 text-sm mt-2">{web3Error}</div>}
            {account && (
              <div className="text-green-400 text-sm mt-2">Connected as {account}</div>
            )}
            <div className="text-center text-sm mt-4 text-blue-200">
              Already have an account?{' '}
              <a href="/login" className="text-blue-300 underline hover:text-blue-100">Login</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
