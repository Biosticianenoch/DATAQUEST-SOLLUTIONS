import { ethers } from "hardhat";
import { LearningMarketplace } from "../typechain-types";

async function main() {
  const marketplace = await ethers.getContractAt(
    "LearningMarketplace",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  ) as LearningMarketplace;

  // Course data from the web interface
  const courses = [
    {
      title: "Introduction to Data Science",
      description: "Learn the fundamentals of data science, including Python, statistics, and machine learning basics.",
      price: ethers.parseEther("0.1"),
      requirements: 100,
      revenueShare: 80 // 80% to creator, 10% platform fee
    },
    {
      title: "Advanced Machine Learning",
      description: "Deep dive into machine learning algorithms, neural networks, and deep learning frameworks.",
      price: ethers.parseEther("0.2"),
      requirements: 200,
      revenueShare: 80
    },
    {
      title: "Data Visualization",
      description: "Master the art of data visualization using tools like Tableau, Power BI, and Python libraries.",
      price: ethers.parseEther("0.15"),
      requirements: 150,
      revenueShare: 80
    }
  ];

  console.log("Creating courses...");
  
  for (const course of courses) {
    // Create metadata URI (in a real app, this would be IPFS)
    const metadataURI = `ipfs://${course.title.toLowerCase().replace(/\s+/g, '-')}`;
    
    const tx = await marketplace.createCourse(
      course.price,
      metadataURI,
      course.revenueShare
    );
    await tx.wait();
    console.log(`Created course: ${course.title}`);
  }

  console.log("All courses created successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 