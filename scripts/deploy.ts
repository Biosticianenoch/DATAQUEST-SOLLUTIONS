import { ethers } from "hardhat";

async function main() {
  // Deploy the DataQuestToken contract
  const DataQuestToken = await ethers.getContractFactory("DataQuestToken");
  const token = await DataQuestToken.deploy();
  await token.deployed();
  console.log("DataQuestToken deployed to:", token.address);

  // Deploy the CourseNFT contract
  const CourseNFT = await ethers.getContractFactory("CourseNFT");
  const courseNFT = await CourseNFT.deploy();
  await courseNFT.deployed();
  console.log("CourseNFT deployed to:", courseNFT.address);

  // Deploy the LearningMarketplace contract
  const LearningMarketplace = await ethers.getContractFactory("LearningMarketplace");
  const marketplace = await LearningMarketplace.deploy(token.address, courseNFT.address);
  await marketplace.deployed();
  console.log("LearningMarketplace deployed to:", marketplace.address);

  // Initialize the marketplace with the token and NFT contracts
  await marketplace.initialize(token.address, courseNFT.address);
  console.log("Marketplace initialized successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
