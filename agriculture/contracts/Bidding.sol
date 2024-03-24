// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
// The Land.sol is still to be imported , this is just for progress report and this contract is isolated for now
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bidding is  Ownable(msg.sender) {
    struct Bid {
        address payable bidder;
        uint256 amount;
        uint256 timestamp;
    }

    struct LandBid {
        uint256 landId;
        uint256 amount;
        uint256 closingTime;
        mapping(address => Bid) bids;
        address[] bidderAddresses; // Array to store bidder addresses
    }

    mapping(uint256 => LandBid) public landBids;

    event BidPlaced(uint256 landId, address bidder, uint256 amount);
    

function createLandBid(uint256 landId, uint256 closingTime, uint256 amount) public onlyOwner {
    require(landBids[landId].closingTime == 0, "Bidding already exists for this land");

    closingTime = block.timestamp + closingTime *86400;
    LandBid storage currentBid = landBids[landId];
    currentBid.landId = landId;
    currentBid.closingTime = closingTime;
    currentBid.amount = amount;

}

function placeBid(uint256 landId, uint256 bidAmount) public payable {
    LandBid storage currentBid = landBids[landId];

    // Ensure bidding is open and bid amount meets starting bid requirement
    require(currentBid.closingTime > block.timestamp, "Bidding closed for this land");
    require(bidAmount >= currentBid.amount, "Bid amount must be greater than or equal to the starting bid");

    // Ensure bid is higher than existing bids (if any)
    require(bidAmount > currentBid.bids[msg.sender].amount, "Bid amount must be higher than existing bids");
  for (uint256 i = 0; i < currentBid.bidderAddresses.length; i++) {
          address bidder = currentBid.bidderAddresses[i];
          if (bidAmount <= currentBid.bids[bidder].amount) {
          revert("Bid amount must be greater than all existing bids");
          }
      }
      
    // Update previous bid for the sender (if any)
    if (currentBid.bids[msg.sender].amount > 0) {
        payable(currentBid.bids[msg.sender].bidder).transfer(currentBid.bids[msg.sender].amount);
    } else {
        currentBid.bidderAddresses.push(msg.sender); // Add the bidder address to the array
    }

    currentBid.bids[msg.sender] = Bid(payable(msg.sender), bidAmount, block.timestamp);
    emit BidPlaced(landId, msg.sender, bidAmount);
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

    function getAddressAtIndex(LandBid storage currentBid, uint256 index) private view returns (address) {
        require(index < getNumberOfBids(currentBid.landId), "Invalid index");

        address[] memory bidderAddresses = currentBid.bidderAddresses;

        return bidderAddresses[index];
    }

    function finalizeBid(uint256 landId) view  public onlyOwner {
        LandBid storage currentBid = landBids[landId];
        require(currentBid.closingTime < block.timestamp, "Bidding is still ongoing");
        require(getNumberOfBids(landId) > 0, "No bids placed for this land");

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

    }
}







// The Below codes are the alternative functions ignore them
    // function createLandBid(uint256 landId, uint256 closingTime) public onlyOwner {
    //     require(landBids[landId].closingTime == 0, "Bidding already exists for this land");

    //     LandBid storage currentBid = landBids[landId];
    //     currentBid.landId = landId;
    //     currentBid.closingTime = closingTime;
    // }

    // function placeBid(uint256 landId) public payable {
    //     LandBid storage currentBid = landBids[landId];
    //     require(currentBid.closingTime > block.timestamp, "Bidding closed for this land");
    //     require(msg.value > currentBid.bids[msg.sender].amount, "Bid amount must be higher than existing bids");

    //     // Update previous bid for the sender (if any)
    //     if (currentBid.bids[msg.sender].amount > 0) {
    //         payable(currentBid.bids[msg.sender].bidder).transfer(currentBid.bids[msg.sender].amount);
    //     } else {
    //         currentBid.bidderAddresses.push(msg.sender); // Add the bidder address to the array
    //     }

    //     currentBid.bids[msg.sender] = Bid(payable(msg.sender), msg.value, block.timestamp);
    //     emit BidPlaced(landId, msg.sender, msg.value);
    // }

    //     function placeBid(uint256 landId, uint256 bidAmount) public payable {
    //     LandBid storage currentBid = landBids[landId];
    //     require(currentBid.closingTime > block.timestamp, "Bidding closed for this land");
    //     require(msg.value >= bidAmount, "Bid amount must be greater than or equal to the specified bid amount");
    //     require(msg.value > currentBid.bids[msg.sender].amount, "Bid amount must be higher than existing bids");

    //     // Update previous bid for the sender (if any)
    //     if (currentBid.bids[msg.sender].amount > 0) {
    //         payable(currentBid.bids[msg.sender].bidder).transfer(currentBid.bids[msg.sender].amount);
    //     } else {
    //         currentBid.bidderAddresses.push(msg.sender); // Add the bidder address to the array
    //     }

    //     currentBid.bids[msg.sender] = Bid(payable(msg.sender), bidAmount, block.timestamp);
    //     emit BidPlaced(landId, msg.sender, bidAmount);
    // }
