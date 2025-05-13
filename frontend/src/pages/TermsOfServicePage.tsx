import React from 'react';
import { Layout } from '@/components/layout/Layout';

const TermsOfServicePage = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <p>By using DataQuest Solutions, you agree to abide by our terms and conditions. Please read the following carefully.</p>
        <h2 className="text-2xl font-semibold">Use of Service</h2>
        <ul className="list-disc ml-6">
          <li>Do not misuse the platform or attempt unauthorized access.</li>
          <li>Respect intellectual property and copyright laws.</li>
        </ul>
        <h2 className="text-2xl font-semibold">Account Responsibilities</h2>
        <ul className="list-disc ml-6">
          <li>Keep your login credentials secure.</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>
        <h2 className="text-2xl font-semibold">Termination</h2>
        <ul className="list-disc ml-6">
          <li>We reserve the right to terminate accounts for violations of these terms.</li>
        </ul>
        <p>For questions, please contact support.</p>
      </div>
    </div>
  </Layout>
);

export default TermsOfServicePage;
