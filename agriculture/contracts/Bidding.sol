// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Land.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bidding is Ownable(msg.sender) {
    Land private LandContract;

    constructor(address _landContractAddress) {
        LandContract = Land(_landContractAddress);
    }

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    struct LandBid {
        uint256 landId;
        uint256 amount;
        uint256 closingTime;
        address owner;
        mapping(address => Bid) bids;
        address[] bidderAddresses; // Array to store bidder addresses
    }

    mapping(uint256 => LandBid) public landBids;

    event BidPlaced(uint256 landId, address bidder, uint256 amount);

    function getTimeStamp(uint256 id)
        external
        view
        onlyOwner
        returns (uint256)
    {
        return landBids[id].closingTime;
    }

    function createLandBid(
        uint256 landId,
        uint256 closingTime,
        uint256 amount,
        address owner
    ) external onlyOwner {
        require(
            landBids[landId].closingTime == 0,
            "Bidding already exists for this land"
        );
        closingTime = block.timestamp + closingTime * 60;
        // closingTime = block.timestamp + closingTime *1 minutes;
        LandBid storage currentBid = landBids[landId];
        currentBid.landId = landId;
        currentBid.closingTime = closingTime;
        currentBid.amount = amount;
        currentBid.owner = owner;
    }

    function placeBid(uint256 landId) external payable {
        LandBid storage currentBid = landBids[landId];

        // Ensure bidding is open and bid amount meets starting bid requirement
        require(
            currentBid.closingTime > block.timestamp,
            "Bidding closed for this land"
        );
        require(
            msg.value >= currentBid.amount,
            "Bid amount must be greater than or equal to the starting bid"
        );

        // Ensure bid is higher than existing bids (if any)
        require(
            msg.value > currentBid.bids[msg.sender].amount,
            "Bid amount must be higher than existing bids"
        );
        for (uint256 i = 0; i < currentBid.bidderAddresses.length; i++) {
            address bidder = currentBid.bidderAddresses[i];
            if (msg.value <= currentBid.bids[bidder].amount) {
                revert("Bid amount must be greater than all existing bids");
            }
        }
        // Update previous bid for the sender (if any)
        require(currentBid.bids[msg.sender].amount < 0, "Bid already placed");
        currentBid.bidderAddresses.push(msg.sender); // Add the bidder address to the array
        currentBid.bids[msg.sender] = Bid(
            msg.sender,
            msg.value,
            block.timestamp
        );
        emit BidPlaced(landId, msg.sender, msg.value);
    }

    function bidPlaced(uint256 landId) public view returns (bool) {
        if (landBids[landId].bids[msg.sender].amount > 0) {
            return true;
        }
        return false;
    }

    function getNumberOfBids(uint256 landId) public view returns (uint256) {
        LandBid storage currentBid = landBids[landId];
        uint256 count = 0;
        address[] memory bidderAddresses = currentBid.bidderAddresses;

        for (uint256 i = 0; i < bidderAddresses.length; i++) {
            if (currentBid.bids[bidderAddresses[i]].amount > 0) {
                count++;
            }
        }
        return count;
    }

    function getAddressAtIndex(LandBid storage currentBid, uint256 index)
        private
        view
        returns (address)
    {
        require(index < getNumberOfBids(currentBid.landId), "Invalid index");
        address[] memory bidderAddresses = currentBid.bidderAddresses;
        return bidderAddresses[index];
    }

    function finalizeBid(uint256 landId, uint256 _timestamp)
        external
        onlyOwner
    {
        LandBid storage currentBid = landBids[landId];
        require(
            currentBid.closingTime < _timestamp,
            "Bidding is still ongoing"
        );
        if (currentBid.bidderAddresses.length < 1) {
            LandContract.changeLandForSell(landId, currentBid.owner);
        } else {
            // Find the highest bidder
            address highestBidder = address(0);
            uint256 highestBid = 0;
            for (uint256 i = 0; i < currentBid.bidderAddresses.length; i++) {
                address bidderAddress = currentBid.bidderAddresses[i];
                if (currentBid.bids[bidderAddress].amount > highestBid) {
                    highestBidder = bidderAddress;
                    highestBid = currentBid.bids[bidderAddress].amount;
                }
            }
            payable(currentBid.owner).transfer(highestBid);
            // Return bid amounts to other bidders
            for (uint256 i = 0; i < currentBid.bidderAddresses.length; i++) {
                if (currentBid.bidderAddresses[i] != highestBidder) {
                    payable(currentBid.bidderAddresses[i]).transfer(
                        currentBid.bids[currentBid.bidderAddresses[i]].amount
                    );
                }
            }
            // Transfer ownership to the highest bidder (assuming Land.sol contract has a function for this)
            LandContract.transferOwnership(
                landId,
                highestBidder,
                currentBid.owner
            );
            // Replace the above line with the appropriate call to your Land.sol contract function
        }
    }
}
