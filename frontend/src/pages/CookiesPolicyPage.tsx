import React from 'react';
import { Layout } from '@/components/layout/Layout';

const CookiesPolicyPage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8 bg-[#e0f7fa]">
      <h1 className="text-[#1976d2] text-4xl font-bold mb-4">Cookies Policy</h1>
      <div className="bg-[#4fc3f7] rounded-lg shadow-md p-6 space-y-4">
        <p className="text-[#0f172a]">DataQuest Solutions uses cookies to enhance your experience and analyze site usage.</p>
        <h2 className="text-[#1976d2] text-2xl font-semibold">What Are Cookies?</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">Small text files stored on your device by your browser.</li>
        </ul>
        <h2 className="text-[#1976d2] text-2xl font-semibold">How We Use Cookies</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">To remember your preferences and login status.</li>
          <li className="text-[#0f172a]">To analyze site traffic and usage patterns.</li>
        </ul>
        <h2 className="text-[#1976d2] text-2xl font-semibold">Managing Cookies</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">You can disable cookies in your browser settings, but this may affect site functionality.</li>
        </ul>
        <p className="text-[#0f172a]">For more information, contact our support team.</p>
      </div>
    </div>
  </Layout>
);

export default CookiesPolicyPage;
