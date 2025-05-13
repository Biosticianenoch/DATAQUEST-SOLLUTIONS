const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DataQuestToken
  const DataQuestToken = await hre.ethers.getContractFactory("DataQuestToken");
  const dqToken = await DataQuestToken.deploy();
  await dqToken.deployed();
  console.log("DataQuestToken deployed to:", dqToken.address);

  // Deploy CourseNFT
  const CourseNFT = await hre.ethers.getContractFactory("CourseNFT");
  const courseNFT = await CourseNFT.deploy();
  await courseNFT.deployed();
  console.log("CourseNFT deployed to:", courseNFT.address);

  // Deploy LearningMarketplace
  const LearningMarketplace = await hre.ethers.getContractFactory("LearningMarketplace");
  const marketplace = await LearningMarketplace.deploy(dqToken.address, courseNFT.address);
  await marketplace.deployed();
  console.log("LearningMarketplace deployed to:", marketplace.address);

  // Setup roles and initial configuration
  const minterRole = await courseNFT.MINTER_ROLE();
  await courseNFT.grantRole(minterRole, marketplace.address);
  console.log("Granted MINTER_ROLE to marketplace");

  const courseCreatorRole = await marketplace.COURSE_CREATOR_ROLE();
  await marketplace.grantRole(courseCreatorRole, deployer.address);
  console.log("Granted COURSE_CREATOR_ROLE to deployer");

  // Transfer some tokens to the marketplace for rewards
  const rewardPool = ethers.utils.parseEther("20000000"); // 20M tokens
  await dqToken.transfer(marketplace.address, rewardPool);
  console.log("Transferred initial reward pool to marketplace");

  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 