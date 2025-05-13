# DataQuest Solutions - Web3 Learning Platform

A decentralized learning platform built with React, TypeScript, and Ethereum smart contracts.

## Project Structure

```
.
├── frontend/           # React frontend application
├── blockchain/         # Smart contracts and blockchain integration
│   ├── contracts/     # Solidity smart contracts
│   └── scripts/       # Deployment and interaction scripts
└── vercel.json        # Vercel deployment configuration
```

## Smart Contracts

The platform uses three main smart contracts:

1. `DataQuestToken.sol` - ERC20 token for platform transactions
2. `CourseNFT.sol` - NFT contract for course ownership
3. `LearningMarketplace.sol` - Marketplace for buying and selling courses

## Getting Started

1. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development

- Frontend is built with React, TypeScript, and Chakra UI
- Smart contracts are written in Solidity
- Web3 integration uses ethers.js
- Deployment is configured for Vercel

## License

MIT