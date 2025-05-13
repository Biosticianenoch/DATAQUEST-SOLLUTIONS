// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CourseNFT is ERC721URIStorage, Ownable {
    // uint256 for token IDs
    uint256 private _nextTokenId = 1;
    
    // Mapping from token ID to course ID
    mapping(uint256 => uint256) public tokenToCourse;
    
    // Mapping from course ID to completion requirements
    mapping(uint256 => uint256) public courseRequirements;
    
    // Mapping from user to course completion status
    mapping(address => mapping(uint256 => bool)) public courseCompleted;

    event CertificateIssued(address indexed student, uint256 indexed courseId, uint256 tokenId);
    event CourseRequirementsSet(uint256 indexed courseId, uint256 requirements);
    
    constructor() ERC721("DataQuest Course Certificate", "DQCC") Ownable(msg.sender) {}
    
    function issueCertificate(
        address student,
        uint256 courseId,
        string memory tokenURI
    ) external onlyOwner returns (uint256) {
        require(!courseCompleted[student][courseId], "Certificate already issued");
        require(courseRequirements[courseId] > 0, "Course requirements not set");
        
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;
        
        _mint(student, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenToCourse[newTokenId] = courseId;
        courseCompleted[student][courseId] = true;
        
        emit CertificateIssued(student, courseId, newTokenId);
        return newTokenId;
    }
    
    function setCourseRequirements(uint256 courseId, uint256 requirements) external onlyOwner {
        require(requirements > 0, "Invalid requirements");
        courseRequirements[courseId] = requirements;
        emit CourseRequirementsSet(courseId, requirements);
    }

    function getCourseId(uint256 tokenId) external view returns (uint256) {
        // This will revert if the token does not exist
        ownerOf(tokenId);
        return tokenToCourse[tokenId];
    }
    
    function hasCertificate(address student, uint256 courseId) external view returns (bool) {
        return courseCompleted[student][courseId];
    }
} 