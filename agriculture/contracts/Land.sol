// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import "./Bidding.sol";

contract Land {
    address contractOwner;
    Bidding private biddingContract;

    constructor() {
        contractOwner = msg.sender;
        biddingContract = new Bidding(msg.sender);
    }

    struct Coordinates {
        uint256 x;
        uint256 y;
    }

    struct Landreg {
        uint256 id;
        uint256 area;
        string state;
        string district;
        string landAddress;
        string propertyPID;
        string surveyNum;
        uint256 landPrice;
        string[] files;
        Coordinates[] coordinates;
        uint256 timestamp;
        bool isforSell;
        address payable ownerAddress;
        bool isLandVerified;
    }

    struct User {
        address id;
        string name;
        string date;
        string gender;
        string aadharNumber;
        string panNumber;
        string email;
        string password;
        string image;
        bool isloggedin;
    }

    struct RegisterLandStruct {
        uint256 id;
        address seller;
        uint256 landId;
    }

    uint256 public userCount;
    uint256 public landsCount;
    uint256 public landOnSaleCount;
    uint256 public RegisteredLandCount;
    uint256 public Registerreqcount;

    mapping(address => User) public UserMapping;
    mapping(uint256 => address) AllUsers;
    mapping(address => bool) RegisteredUserMapping;
    mapping(address => Landreg[]) public lands;
    mapping(uint256 => RegisterLandStruct[]) public Registerrequests;
    address[] public ownerMapping;

    modifier onlyRegisteredUsers(address addr) {
        require(RegisteredUserMapping[addr] == true, "Not resgistered");
        _;
    }

    modifier onlyContractOwner() {
        require(
            msg.sender == contractOwner,
            "Only contract owner can access this"
        );
        _;
    }

    event ownerShipTranfer(address owner, address bidder, uint256 amount);
    event changeLandSell(address owner);

    function registerUser(
        string memory _name,
        string memory _date,
        string memory _gender,
        string memory _aadharNumber,
        string memory _panNumber,
        string memory _email,
        string memory _password,
        string memory _image
    ) public {
        require(!RegisteredUserMapping[msg.sender], "Already registered");
        require(msg.sender != contractOwner, "contract owner cannot register");
        RegisteredUserMapping[msg.sender] = true;
        userCount++;
        AllUsers[userCount] = msg.sender;
        UserMapping[msg.sender] = User(
            msg.sender,
            _name,
            _date,
            _gender,
            _aadharNumber,
            _panNumber,
            _email,
            _password,
            _image,
            true
        );
        login(msg.sender);
        if (!isElementPresent(msg.sender)) {
            ownerMapping.push(msg.sender);
        }
    }

    function getUser(address _addr) public view returns (User memory) {
        return UserMapping[_addr];
    }

    function login(
        address _addr
    ) public onlyRegisteredUsers(_addr) returns (bool) {
        if (RegisteredUserMapping[_addr] && UserMapping[_addr].id == _addr) {
            UserMapping[_addr].isloggedin = true;
            return true;
        } else {
            return false;
        }
    }

    function isContractOwner(address _addr) public view returns (bool) {
        return _addr == contractOwner;
    }

    function logout(address _addr) public onlyRegisteredUsers(_addr) {
        UserMapping[_addr].isloggedin = false;
    }

    function resetPass(
        string memory password
    ) public onlyRegisteredUsers(msg.sender) {
        require(
            UserMapping[msg.sender].id == msg.sender,
            "Address not owned by"
        );
        UserMapping[msg.sender].password = password;
    }

    function isElementPresent(address _element) public view returns (bool) {
        for (uint256 i = 0; i < ownerMapping.length; i++) {
            if (ownerMapping[i] == _element) {
                return true; // Element is present
            }
        }
        return false; // Element is not present
    }

    function areCoordinatesEqual(
        Coordinates[] storage coords1,
        Coordinates[] calldata coords2
    ) internal view returns (bool) {
        if (coords1.length != coords2.length) {
            return false;
        }
        for (uint256 i = 0; i < coords1.length; i++) {
            if (coords1[i].x != coords2[i].x || coords1[i].y != coords2[i].y) {
                return false;
            }
        }
        return true;
    }

    function addLand(
        uint256 _area,
        string memory _state,
        string memory _district,
        string memory _address,
        string memory _propertyPID,
        string memory _surveyNum,
        uint256 _landPrice,
        string[] memory _files,
        Coordinates[] calldata coordinates
    ) public onlyRegisteredUsers(msg.sender) {
        for (uint256 i = 0; i < ownerMapping.length; i++) {
            Landreg[] storage ownerLands = lands[ownerMapping[i]];
            for (uint256 j = 0; j < ownerLands.length; j++) {
                if (
                    areCoordinatesEqual(ownerLands[j].coordinates, coordinates)
                ) {
                    revert(
                        "Another land with the same coordinates already exists."
                    );
                }
            }
        }

        Landreg storage newLand = lands[msg.sender].push();
        newLand.id = landsCount;
        newLand.area = _area;
        newLand.state = _state;
        newLand.district = _district;
        newLand.landAddress = _address;
        newLand.propertyPID = _propertyPID;
        newLand.surveyNum = _surveyNum;
        newLand.landPrice = _landPrice;
        newLand.timestamp = block.timestamp;
        newLand.isforSell = false;
        newLand.ownerAddress = payable(msg.sender);
        newLand.isLandVerified = false;

        for (uint256 i = 0; i < _files.length; i++) {
            newLand.files.push(_files[i]);
        }

        for (uint256 i = 0; i < coordinates.length; i++) {
            newLand.coordinates.push(coordinates[i]);
        }

        landsCount++;
        Registerrequests[Registerreqcount].push(
            RegisterLandStruct(Registerreqcount, msg.sender, landsCount)
        );
        Registerreqcount++;
    }

    function getMyLands(
        address _addr
    ) public view onlyRegisteredUsers(_addr) returns (Landreg[] memory) {
        return lands[_addr];
    }

    function isBid(uint256 landId) public view returns (bool, uint256) {
        return biddingContract.bidPlaced(landId, msg.sender);
    }

    function getAllLands(
        address _addr
    ) public view onlyRegisteredUsers(_addr) returns (Landreg[] memory) {
        Landreg[] memory result = new Landreg[](ownerMapping.length - 1);
        uint256 index = 0;
        for (uint256 i = 0; i < ownerMapping.length; i++) {
            if (ownerMapping[i] != _addr) {
                Landreg[] memory ownerLands = lands[ownerMapping[i]];
                for (uint256 j = 0; j < ownerLands.length; j++) {
                    if (ownerLands[j].isforSell) {
                        result[index] = ownerLands[j];
                        index++;
                    }
                }
            }
        }
        return result;
    }

    function getSellRequest()
        public
        view
        onlyContractOwner
        returns (Landreg[] memory)
    {
        Landreg[] memory result = new Landreg[](ownerMapping.length);
        uint256 index = 0;
        for (uint256 i = 0; i < Registerreqcount; i++) {
            RegisterLandStruct[] memory sellerLands = Registerrequests[i];
            for (uint256 k = 0; k < sellerLands.length; k++) {
                Landreg[] memory ownerLands = lands[sellerLands[k].seller];
                for (uint256 j = 0; j < ownerLands.length; j++) {
                    if (ownerLands[j].isLandVerified == false) {
                        result[index] = ownerLands[j];
                        index++;
                    }
                }
            }
        }
        return result;
    }

    function acceptReg(address _addr, uint256 id) public onlyContractOwner {
        lands[_addr][id].isLandVerified = true;

        for (uint256 i = id; i < Registerreqcount; i++) {
            Registerrequests[i] = Registerrequests[i + 1];
        }
        if (Registerrequests[Registerreqcount].length > 0) {
            Registerrequests[Registerreqcount].pop();
        }
        Registerreqcount--;
        RegisteredLandCount++;
    }

    function rejectReg(uint256 index) public onlyContractOwner {
        delete lands[Registerrequests[index][0].seller][
            Registerrequests[index][0].landId
        ];
        for (uint256 i = index; i < Registerreqcount; i++) {
            Registerrequests[i] = Registerrequests[i + 1];
        }
        if (Registerrequests[Registerreqcount].length > 0) {
            Registerrequests[Registerreqcount].pop();
        }
        Registerreqcount--;
    }

    function getTime(uint256 landId) public view returns (uint256) {
        return biddingContract.getTimeStamp(landId);
    }

    function createLandBid(
        uint256 landId,
        uint256 closingTime,
        uint256 amount,
        address seller
    ) public onlyRegisteredUsers(seller) {
        lands[seller][landId].isforSell = true;
        biddingContract.createLandBid(landId, closingTime, amount, seller);
        landOnSaleCount++;
    }

    function placeBid(
        uint256 landId
    ) public payable onlyRegisteredUsers(msg.sender) {
        biddingContract.placeBid{value: msg.value}(landId, msg.sender);
    }

    function transferOwnership(
        uint256 id,
        address bidder,
        address seller,
        uint256 _amount
    ) private onlyContractOwner {
        Landreg storage soldLand = lands[seller][id];
        soldLand.ownerAddress = payable(bidder);
        soldLand.isforSell = false;
        lands[bidder].push(soldLand);
        delete lands[seller][id];
        biddingContract.deleteBid(id);
        emit ownerShipTranfer(seller, bidder, _amount);
    }

    function changeLandForSell(uint256 id, address seller) public {
        lands[seller][id].isforSell = false;
        biddingContract.deleteBid(id);
        emit changeLandSell(seller);
    }

    function finalizeBid(uint256 landId, uint256 timestamp) public {
        uint256 id;
        address bidder;
        address owner;
        uint256 _amount;
        (id, bidder, owner, _amount) = biddingContract.finalizeBid(
            landId,
            timestamp
        );
        if (bidder != address(0)) {
            transferOwnership(id, bidder, owner, _amount);
        } else {
            changeLandForSell(id, owner);
        }
    }

    //function getHighestBid(uint256 landId) public view returns(uint256){
    //    return biddingContract.getHighestBid(landId);
    // }

    function dashBoardStats()
        public
        view
        returns (uint256, uint256, uint256, uint256)
    {
        return (userCount, landsCount, landOnSaleCount, RegisteredLandCount);
    }
}
