// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DataQuestToken is ERC20, Ownable, ReentrancyGuard {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;
    uint256 public constant APY = 12; // 12% annual yield
    uint256 public constant MINIMUM_STAKE_AMOUNT = 100 * 10**18; // 100 tokens
    uint256 public constant STAKE_DURATION = 365 days;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event RewardPaid(address indexed user, uint256 reward);

    constructor() ERC20("DataQuest Token", "DQT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**decimals()); // Initial supply: 1 million tokens
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount >= MINIMUM_STAKE_AMOUNT, "Stake amount too low");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        if (stakes[msg.sender].amount > 0) {
            _processReward(msg.sender);
        }

        _transfer(msg.sender, address(this), amount);
        stakes[msg.sender] = Stake(amount, block.timestamp);
        
        emit Staked(msg.sender, amount);
    }

    function unstake() external nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");
        
        uint256 reward = _calculateReward(msg.sender);
        uint256 amount = userStake.amount;
        
        delete stakes[msg.sender];
        
        _mint(msg.sender, reward);
        _transfer(address(this), msg.sender, amount);
        
        emit Unstaked(msg.sender, amount, reward);
    }

    function getReward() external view returns (uint256) {
        return _calculateReward(msg.sender);
    }

    function _calculateReward(address user) internal view returns (uint256) {
        Stake storage userStake = stakes[user];
        if (userStake.amount == 0) return 0;

        uint256 timeElapsed = block.timestamp - userStake.timestamp;
        if (timeElapsed > STAKE_DURATION) {
            timeElapsed = STAKE_DURATION;
        }

        return (userStake.amount * APY * timeElapsed) / (STAKE_DURATION * 100);
    }

    function _processReward(address user) internal {
        uint256 reward = _calculateReward(user);
        if (reward > 0) {
            _mint(user, reward);
            emit RewardPaid(user, reward);
        }
    }
} 