import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CourseNFT } from "../typechain-types";

describe("CourseNFT", function () {
  let nft: CourseNFT;
  let owner: SignerWithAddress;
  let minter: SignerWithAddress;
  let student: SignerWithAddress;

  const courseId = 1;
  const courseName = "Introduction to Blockchain";
  const score = 85;
  const metadataURI = "ipfs://QmTest";

  beforeEach(async function () {
    [owner, minter, student] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("CourseNFT");
    nft = await NFT.deploy();
    await nft.deployed();

    // Grant minter role
    const minterRole = await nft.MINTER_ROLE();
    await nft.grantRole(minterRole, minter.address);
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      const adminRole = await nft.DEFAULT_ADMIN_ROLE();
      expect(await nft.hasRole(adminRole, owner.address)).to.be.true;
    });

    it("Should grant minter role correctly", async function () {
      const minterRole = await nft.MINTER_ROLE();
      expect(await nft.hasRole(minterRole, minter.address)).to.be.true;
    });
  });

  describe("Certificate Minting", function () {
    it("Should mint certificate with correct metadata", async function () {
      const tx = await nft.connect(minter).mintCertificate(
        student.address,
        courseId,
        courseName,
        score,
        metadataURI
      );

      const tokenId = 1; // First token
      const certificate = await nft.getCertificate(tokenId);

      expect(certificate.courseId).to.equal(courseId);
      expect(certificate.student).to.equal(student.address);
      expect(certificate.courseName).to.equal(courseName);
      expect(certificate.score).to.equal(score);
      expect(await nft.tokenURI(tokenId)).to.equal(metadataURI);
    });

    it("Should prevent minting with insufficient score", async function () {
      await expect(
        nft.connect(minter).mintCertificate(
          student.address,
          courseId,
          courseName,
          69, // Below minimum score
          metadataURI
        )
      ).to.be.revertedWith("Minimum score not achieved");
    });

    it("Should prevent duplicate certificates", async function () {
      await nft.connect(minter).mintCertificate(
        student.address,
        courseId,
        courseName,
        score,
        metadataURI
      );

      await expect(
        nft.connect(minter).mintCertificate(
          student.address,
          courseId,
          courseName,
          score,
          metadataURI
        )
      ).to.be.revertedWith("Certificate already issued");
    });

    it("Should prevent non-minters from minting", async function () {
      await expect(
        nft.connect(student).mintCertificate(
          student.address,
          courseId,
          courseName,
          score,
          metadataURI
        )
      ).to.be.revertedWith(
        `AccessControl: account ${student.address.toLowerCase()} is missing role ${await nft.MINTER_ROLE()}`
      );
    });
  });

  describe("Certificate Verification", function () {
    beforeEach(async function () {
      await nft.connect(minter).mintCertificate(
        student.address,
        courseId,
        courseName,
        score,
        metadataURI
      );
    });

    it("Should verify existing certificate", async function () {
      expect(await nft.verifyCertificate(student.address, courseId)).to.be.true;
    });

    it("Should return false for non-existent certificate", async function () {
      expect(await nft.verifyCertificate(student.address, 999)).to.be.false;
    });

    it("Should return certificate data", async function () {
      const tokenId = 1;
      const certificate = await nft.getCertificate(tokenId);

      expect(certificate.courseId).to.equal(courseId);
      expect(certificate.student).to.equal(student.address);
      expect(certificate.courseName).to.equal(courseName);
      expect(certificate.score).to.equal(score);
    });

    it("Should fail to get non-existent certificate", async function () {
      await expect(nft.getCertificate(999)).to.be.revertedWith(
        "Certificate does not exist"
      );
    });
  });

  describe("Pause Functionality", function () {
    it("Should allow admin to pause and unpause", async function () {
      await nft.pause();
      expect(await nft.paused()).to.be.true;

      await expect(
        nft.connect(minter).mintCertificate(
          student.address,
          courseId,
          courseName,
          score,
          metadataURI
        )
      ).to.be.reverted;

      await nft.unpause();
      expect(await nft.paused()).to.be.false;

      await expect(
        nft.connect(minter).mintCertificate(
          student.address,
          courseId,
          courseName,
          score,
          metadataURI
        )
      ).not.to.be.reverted;
    });

    it("Should prevent non-admin from pausing", async function () {
      await expect(nft.connect(student).pause()).to.be.reverted;
    });
  });
}); 