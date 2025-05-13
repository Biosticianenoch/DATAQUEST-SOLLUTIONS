// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LearningMarketplace is Ownable, ReentrancyGuard {
    IERC20 public immutable paymentToken;
    
    struct Course {
        address creator;
        uint256 price;
        string metadataURI;
        bool active;
        uint256 revenueShare; // Percentage of revenue shared with creator (0-100)
    }
    
    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public userHasAccess;
    mapping(uint256 => uint256) public courseRevenue;
    
    uint256 public nextCourseId;
    uint256 public platformFee = 10; // 10% platform fee

    event CourseCreated(uint256 indexed courseId, address indexed creator, uint256 price, string metadataURI);
    event CoursePurchased(uint256 indexed courseId, address indexed student);
    event CourseUpdated(uint256 indexed courseId, uint256 price, string metadataURI);
    event RevenueWithdrawn(address indexed creator, uint256 amount);
    event CourseStatusChanged(uint256 indexed courseId, bool active);

    constructor(address _paymentToken) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    function createCourse(
        uint256 price,
        string memory metadataURI,
        uint256 revenueShare
    ) external returns (uint256) {
        require(revenueShare <= 100, "Invalid revenue share percentage");
        require(revenueShare + platformFee <= 100, "Total fees exceed 100%");

        uint256 courseId = nextCourseId++;
        courses[courseId] = Course({
            creator: msg.sender,
            price: price,
            metadataURI: metadataURI,
            active: true,
            revenueShare: revenueShare
        });

        emit CourseCreated(courseId, msg.sender, price, metadataURI);
        return courseId;
    }

    function purchaseCourse(uint256 courseId) external nonReentrant {
        Course storage course = courses[courseId];
        require(course.active, "Course is not active");
        require(!userHasAccess[msg.sender][courseId], "Already purchased");
        require(paymentToken.balanceOf(msg.sender) >= course.price, "Insufficient balance");

        // Transfer payment
        require(paymentToken.transferFrom(msg.sender, address(this), course.price), "Payment failed");

        // Calculate revenue shares
        uint256 creatorShare = (course.price * course.revenueShare) / 100;
        uint256 platformShare = (course.price * platformFee) / 100;

        // Update revenue tracking
        courseRevenue[courseId] += creatorShare;

        // Grant access
        userHasAccess[msg.sender][courseId] = true;

        emit CoursePurchased(courseId, msg.sender);
    }
    
    function updateCourse(
        uint256 courseId,
        uint256 newPrice,
        string memory newMetadataURI
    ) external {
        Course storage course = courses[courseId];
        require(msg.sender == course.creator, "Not course creator");

        course.price = newPrice;
        course.metadataURI = newMetadataURI;
        
        emit CourseUpdated(courseId, newPrice, newMetadataURI);
    }

    function toggleCourseStatus(uint256 courseId) external {
        Course storage course = courses[courseId];
        require(msg.sender == course.creator || msg.sender == owner(), "Unauthorized");

        course.active = !course.active;
        emit CourseStatusChanged(courseId, course.active);
    }
    
    function withdrawRevenue(uint256 courseId) external nonReentrant {
        Course storage course = courses[courseId];
        require(msg.sender == course.creator, "Not course creator");
        
        uint256 amount = courseRevenue[courseId];
        require(amount > 0, "No revenue to withdraw");

        courseRevenue[courseId] = 0;
        require(paymentToken.transfer(msg.sender, amount), "Transfer failed");
        
        emit RevenueWithdrawn(msg.sender, amount);
    }
    
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 30, "Fee too high"); // Maximum 30% platform fee
        platformFee = newFee;
    }
    
    function getCourse(uint256 courseId) external view returns (
        address creator,
        uint256 price,
        string memory metadataURI,
        bool active,
        uint256 revenueShare
    ) {
        Course storage course = courses[courseId];
        return (
            course.creator,
            course.price,
            course.metadataURI,
            course.active,
            course.revenueShare
        );
    }
} 