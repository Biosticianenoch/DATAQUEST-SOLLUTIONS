# DataQuest Solutions

A comprehensive Web3-enabled data science learning platform that combines interactive courses, real-world projects, blockchain-based rewards, and a supportive community. All data is stored on-chain and IPFS for true decentralization.

## Features

- **Interactive Learning**: Engaging courses with hands-on exercises
- **Project-Based Learning**: Real-world projects to apply your knowledge
- **Progress Tracking**: Monitor your learning journey through blockchain
- **Community Support**: Connect with other learners
- **Secure Authentication**: Web3 wallet-based authentication
- **Responsive Design**: Works on desktop and mobile devices
- **Web3 Integration**: 
  - ERC20 token (DataQuestToken) for platform governance and rewards
  - NFT certificates (CourseNFT) for course completion
  - Decentralized marketplace for course transactions
  - Token staking with 12% APY
  - IPFS content storage for course materials
  - Revenue-sharing system for course creators

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Radix UI for accessible components
- React Query for data fetching
- React Router for navigation
- Web3.js for blockchain interactions
- Web3.Storage for IPFS integration

### Backend
- Node.js with Express
- TypeScript
- Winston for logging
- Zod for validation

### Blockchain
- Solidity smart contracts
- Hardhat development environment
- OpenZeppelin contract standards
- Ethers.js for contract interactions
- IPFS for decentralized storage

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Hardhat for local blockchain development

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dataquest-solutions.git
cd dataquest-solutions
```

### 2. Environment Setup

Create `.env` files in the project directories:

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_WEB3_STORAGE_TOKEN=your_web3_storage_token
VITE_CONTRACT_ADDRESS_TOKEN=your_token_contract_address
VITE_CONTRACT_ADDRESS_NFT=your_nft_contract_address
VITE_CONTRACT_ADDRESS_MARKETPLACE=your_marketplace_contract_address
```

#### Hardhat (.env)
```env
PRIVATE_KEY=your_deployment_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
```

### 3. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install blockchain dependencies
cd ../blockchain
npm install
```

### 4. Start Development Environment

```bash
# Start Hardhat node (from blockchain directory)
npx hardhat node

# Deploy contracts (in a new terminal)
npx hardhat run scripts/deploy.ts --network localhost

# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Local Blockchain: http://localhost:8545

## Smart Contracts

### DataQuestToken (ERC20)
- Platform governance token
- Staking functionality with 12% APY
- Reward distribution for course completion

### CourseNFT (ERC721)
- Course completion certificates
- Metadata stored on IPFS
- Verifiable on-chain achievements

### LearningMarketplace
- Course listing and purchasing
- Revenue sharing mechanism
- Token-based transactions

## Development

### Code Structure

```
dataquest-solutions/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── lib/       # Utility functions and configurations
│   │   ├── web3/      # Web3 context and hooks
│   │   └── pages/     # Page components
│   └── public/        # Static assets
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── middleware/# Express middleware
│   │   └── utils/     # Utility functions
│   └── logs/         # Application logs
├── blockchain/        # Smart contract development
│   ├── contracts/    # Solidity smart contracts
│   ├── test/        # Contract test files
│   ├── scripts/     # Deployment scripts
│   └── hardhat.config.ts # Hardhat configuration
└── courses/          # Course content and resources
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

#### Backend
- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm run test` - Run tests
- `npm start` - Start production server

#### Blockchain
- `npx hardhat compile` - Compile smart contracts
- `npx hardhat test` - Run contract tests
- `npx hardhat node` - Start local blockchain
- `npx hardhat run scripts/deploy.ts` - Deploy contracts
- `npx hardhat verify` - Verify contracts on Etherscan

## Deployment

The application supports deployment on various platforms:
- Frontend: Vercel
- Backend: Railway/Heroku
- Smart Contracts: Ethereum mainnet/testnet

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build

# Deploy contracts (example for testnet)
cd ../blockchain
npx hardhat run scripts/deploy.ts --network goerli
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@dataquest-solutions.com or open an issue in the GitHub repository.