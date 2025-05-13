import { ethers } from "hardhat";

async function main() {
  // Deploy DataQuestToken
  const DataQuestToken = await ethers.getContractFactory("DataQuestToken");
  const dataQuestToken = await DataQuestToken.deploy();
  await dataQuestToken.waitForDeployment();
  console.log("DataQuestToken deployed to:", await dataQuestToken.getAddress());

  // Deploy CourseNFT
  const CourseNFT = await ethers.getContractFactory("CourseNFT");
  const courseNFT = await CourseNFT.deploy();
  await courseNFT.waitForDeployment();
  console.log("CourseNFT deployed to:", await courseNFT.getAddress());

  // Deploy LearningMarketplace
  const LearningMarketplace = await ethers.getContractFactory("LearningMarketplace");
  const learningMarketplace = await LearningMarketplace.deploy(await dataQuestToken.getAddress());
  await learningMarketplace.waitForDeployment();
  console.log("LearningMarketplace deployed to:", await learningMarketplace.getAddress());

  // Set marketplace as owner of CourseNFT
  const courseNFTOwner = await courseNFT.owner();
  if (courseNFTOwner !== await learningMarketplace.getAddress()) {
    const transferTx = await courseNFT.transferOwnership(await learningMarketplace.getAddress());
    await transferTx.wait();
    console.log("Transferred CourseNFT ownership to marketplace");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 