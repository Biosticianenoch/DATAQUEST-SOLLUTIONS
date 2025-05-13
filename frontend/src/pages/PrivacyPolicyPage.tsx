import React from 'react';
import { Layout } from '@/components/layout/Layout';

const PrivacyPolicyPage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8 bg-[#e0f7fa]">
      <h1 className="text-[#0f172a] text-4xl font-bold mb-4">Privacy Policy</h1>
      <div className="bg-[#b3e5fc] rounded-lg shadow-md p-6 space-y-4">
        <p className="text-[#0f172a]">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use DataQuest Solutions.</p>
        <h2 className="text-[#0f172a] text-2xl font-semibold">Information We Collect</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">Personal information you provide (such as name, email, payment details).</li>
          <li className="text-[#0f172a]">Usage data and analytics.</li>
        </ul>
        <h2 className="text-[#0f172a] text-2xl font-semibold">How We Use Your Information</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">To provide and improve our services.</li>
          <li className="text-[#0f172a]">To communicate with you about your account or transactions.</li>
          <li className="text-[#0f172a]">To comply with legal obligations.</li>
        </ul>
        <h2 className="text-[#0f172a] text-2xl font-semibold">Your Rights</h2>
        <ul className="list-disc ml-6">
          <li className="text-[#0f172a]">Access, update, or delete your information by contacting support.</li>
        </ul>
        <p className="text-[#0f172a]">For more details, please contact us via the Contact page.</p>
      </div>
    </div>
  </Layout>
);

export default PrivacyPolicyPage;
