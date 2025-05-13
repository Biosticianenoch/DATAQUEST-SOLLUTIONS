import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useWeb3 } from '@/contexts/Web3Context';
import { ethers } from 'ethers';

const LoginPage: React.FC = () => {
  const { connect, account, signer, isConnecting, error: web3Error } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the redirect path from location state if available
  const from = location.state?.from || '/admin';

  // Web3 wallet login handler
  const handleWalletLogin = async () => {
    try {
      await connect();
      if (!signer) throw new Error('No signer found');
      // You may want to fetch a nonce from your backend here for true security
      const message = 'Sign in to DataQuest Solutions';
      const signature = await signer.signMessage(message);
      // Optionally, send { address: account, signature } to your backend for verification
      toast({
        title: 'Wallet Login Successful',
        description: `Welcome, ${account}`,
      });
      navigate(from);
    } catch (err: any) {
      toast({
        title: 'Wallet Login Failed',
        description: err.message || 'Could not sign in with wallet.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#e0f7fa] to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-800 to-[#b3e5fc] border-0 shadow-xl text-[#0f172a]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0f172a] text-center">Sign in with Wallet</CardTitle>
          <CardDescription className="text-[#0288d1] text-center">Connect your wallet to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6 py-6">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-700 text-[#0f172a] text-lg font-semibold"
              onClick={handleWalletLogin}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting Wallet...' : 'Sign in with Wallet'}
            </Button>
            {web3Error && <div className="text-red-400 text-sm mt-2">{web3Error}</div>}
            {account && (
              <div className="text-green-600 text-sm mt-2">Connected as {account}</div>
            )}
            <div className="text-center text-sm mt-4 text-[#0288d1]">
              Don't have an account?{' '}
              <a href="/register" className="text-[#4fc3f7] underline hover:text-[#1976d2]">Register</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
