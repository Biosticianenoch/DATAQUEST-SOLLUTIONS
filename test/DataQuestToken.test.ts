import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DataQuestToken } from "../typechain-types";

describe("DataQuestToken", function () {
  let token: DataQuestToken;
  let owner: SignerWithAddress;
  let student: SignerWithAddress;
  let contributor: SignerWithAddress;

  beforeEach(async function () {
    [owner, student, contributor] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("DataQuestToken");
    token = await Token.deploy();
    await token.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Course Completion Rewards", function () {
    it("Should reward student for course completion", async function () {
      const initialBalance = await token.balanceOf(student.address);
      const rewardAmount = await token.courseCompletionReward();

      // Transfer some tokens to contract for rewards
      await token.transfer(token.address, rewardAmount.mul(10));

      await token.rewardCourseCompletion(student.address);

      const finalBalance = await token.balanceOf(student.address);
      expect(finalBalance.sub(initialBalance)).to.equal(rewardAmount);
    });

    it("Should fail if reward pool is insufficient", async function () {
      await expect(
        token.rewardCourseCompletion(student.address)
      ).to.be.revertedWith("Insufficient reward pool");
    });
  });

  describe("Staking", function () {
    const stakeAmount = ethers.utils.parseEther("1000");

    beforeEach(async function () {
      // Transfer tokens to student for staking
      await token.transfer(student.address, stakeAmount.mul(2));
    });

    it("Should allow staking tokens", async function () {
      await token.connect(student).approve(token.address, stakeAmount);
      await token.connect(student).stake(stakeAmount);

      const stakedBalance = await token.stakedBalance(student.address);
      expect(stakedBalance).to.equal(stakeAmount);
    });

    it("Should not allow unstaking before minimum period", async function () {
      await token.connect(student).approve(token.address, stakeAmount);
      await token.connect(student).stake(stakeAmount);

      await expect(
        token.connect(student).unstake()
      ).to.be.revertedWith("Minimum staking period not met");
    });

    it("Should calculate rewards correctly", async function () {
      await token.connect(student).approve(token.address, stakeAmount);
      await token.connect(student).stake(stakeAmount);

      // Simulate time passing (31 days)
      await ethers.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      const reward = await token.calculateStakingReward(student.address);
      const expectedYearlyReward = stakeAmount.mul(12).div(100); // 12% APY
      const expectedReward = expectedYearlyReward.mul(31).div(365);

      expect(reward).to.be.closeTo(expectedReward, ethers.utils.parseEther("0.1"));
    });
  });

  describe("Contribution Rewards", function () {
    it("Should reward contributor", async function () {
      const initialBalance = await token.balanceOf(contributor.address);
      const rewardAmount = await token.contributionReward();

      // Transfer some tokens to contract for rewards
      await token.transfer(token.address, rewardAmount.mul(10));

      await token.rewardContribution(contributor.address);

      const finalBalance = await token.balanceOf(contributor.address);
      expect(finalBalance.sub(initialBalance)).to.equal(rewardAmount);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to update course completion reward", async function () {
      const newReward = ethers.utils.parseEther("200");
      await token.updateCourseCompletionReward(newReward);
      expect(await token.courseCompletionReward()).to.equal(newReward);
    });

    it("Should allow owner to update contribution reward", async function () {
      const newReward = ethers.utils.parseEther("20");
      await token.updateContributionReward(newReward);
      expect(await token.contributionReward()).to.equal(newReward);
    });

    it("Should allow owner to pause and unpause", async function () {
      await token.pause();
      expect(await token.paused()).to.be.true;

      await token.unpause();
      expect(await token.paused()).to.be.false;
    });

    it("Should prevent non-owners from calling admin functions", async function () {
      await expect(
        token.connect(student).updateCourseCompletionReward(0)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await expect(
        token.connect(student).pause()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
}); 