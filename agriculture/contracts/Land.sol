// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Land {
    address contractOwner;

    constructor() {
        contractOwner = msg.sender;
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
        uint256 timestamp;
        bool isforSell;
        address payable ownerAddress;
        bool isLandVerified;
    }

    struct Buyer {
        uint256 id;
        uint256 area;
        string landAddress;
        string propertyPID;
        string surveyNum;
        uint256 landPrice;
        string[] files;
        uint256 timestamp;
        bool isforSell;
        address payable ownerAddress;
        bool isLandVerified;
        address buyer;
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

    struct sellReqStruct {
        uint256 id;
        address seller;
    }
    struct buyReqStruct {
        uint256 id;
        address seller;
        address buyer;
        uint256 land_id;
        uint256 price;
    }

    uint256 public userCount;
    uint256 public landsCount;
    uint256 public Registerreqcount;
    uint256 public buyreqcount;

    mapping(address => User) public UserMapping;
    mapping(uint256 => address) AllUsers;
    mapping(address => bool) RegisteredUserMapping;
    mapping(address => Landreg[]) public lands;
    mapping(uint256 => sellReqStruct[]) public Registerrequests;
    mapping(uint256 => buyReqStruct[]) public Buyrequests;
    address[] public ownerMapping;

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
        require(!RegisteredUserMapping[msg.sender], "Already resgistered");
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

    function login(address _addr) public returns (bool) {
        if (RegisteredUserMapping[_addr]) {
            UserMapping[_addr].isloggedin = true;
            return true;
        } else {
            return false;
        }
    }

    function logout(address _addr) public {
        UserMapping[_addr].isloggedin = false;
    }

    function resetPass(string memory password) public {
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

    function addLand(
        uint256 _area,
        string memory _state,
        string memory _district,
        string memory _address,
        string memory _propertyPID,
        string memory _surveyNum,
        uint256 _landPrice,
        string[] memory _files
        //string memory _timestamp
    ) public {
        lands[msg.sender].push(
            Landreg(
                landsCount,
                _area,
                _state,
                _district,
                _address,
                _propertyPID,
                _surveyNum,
                _landPrice,
                _files,
                block.timestamp,
                false,
                payable(msg.sender),
                false
            )
        );
        landsCount++;
        Registerrequests[Registerreqcount].push(
            sellReqStruct(Registerreqcount, msg.sender)
        );
        Registerreqcount++;
    }

    function getMyLands(address _addr) public view returns (Landreg[] memory) {
        return lands[_addr];
    }

    function getAllLands(address _addr) public view returns (Landreg[] memory) {
        Landreg[] memory result = new Landreg[](ownerMapping.length - 1);
        uint256 index = 0;
        for (uint256 i = 0; i < ownerMapping.length; i++) {
            if (ownerMapping[i] != _addr) {
                Landreg[] memory ownerLands = lands[ownerMapping[i]];
                for (uint256 j = 0; j < ownerLands.length; j++) {
                    result[index] = ownerLands[j];
                    index++;
                }
            }
        }
        return result;
    }

    function sellReq(address _addr, uint256 id) public {
        if (lands[_addr][id].isLandVerified == true) {
            lands[_addr][id].isforSell = true;
        }
    }

    function getSellRequest() public view returns (Landreg[] memory) {
        Landreg[] memory result = new Landreg[](ownerMapping.length);
        uint256 index = 0;
        for (uint256 i = 0; i < Registerreqcount; i++) {
            sellReqStruct[] memory sellerLands = Registerrequests[i];
            for (uint256 k = 0; k < sellerLands.length; k++) {
                Landreg[] memory ownerLands = lands[sellerLands[k].seller];
                for (uint256 j = 0; j < ownerLands.length; j++) {
                    result[index] = ownerLands[j];
                    index++;
                }
            }
        }
        return result;
    }

    function getBuyRequest() public view returns (Buyer[] memory) {
        Buyer[] memory result = new Buyer[](ownerMapping.length);
        uint256 index = 0;
        for (uint256 i = 0; i < buyreqcount; i++) {
            buyReqStruct[] memory buyerLands = Buyrequests[i];
            for (uint256 k = 0; k < buyerLands.length; k++) {
                Landreg[] memory ownerLands = lands[buyerLands[k].seller];
                for (uint256 j = 0; j < ownerLands.length; j++) {
                    result[index] = Buyer(
                        ownerLands[j].id,
                        ownerLands[j].area,
                        ownerLands[j].landAddress,
                        ownerLands[j].propertyPID,
                        ownerLands[j].surveyNum,
                        ownerLands[j].landPrice,
                        ownerLands[j].files,
                        ownerLands[j].timestamp,
                        ownerLands[j].isforSell,
                        ownerLands[j].ownerAddress,
                        ownerLands[j].isLandVerified,
                        buyerLands[k].buyer
                    );
                    index++;
                }
            }
        }
        return result;
    }

    function buyReq(
        address buyer_addr,
        address seller_addr,
        uint256 id,
        uint256 price
    ) public {
        Buyrequests[buyreqcount].push(
            buyReqStruct(buyreqcount, seller_addr, buyer_addr, id, price)
        );
        buyreqcount++;
    }

    function acceptReg(address _addr, uint256 id, uint256 price) public {
        lands[_addr][id].isLandVerified = true;
        if (price > 0) {
            lands[_addr][id].landPrice = price;
        }
        for (uint256 i = id; i < Registerreqcount; i++) {
            Registerrequests[i] = Registerrequests[i + 1];
        }
        if (Registerrequests[Registerreqcount].length > 0) {
            Registerrequests[Registerreqcount].pop();
        }
        Registerreqcount--;
    }

    function rejectReg(uint256 index) public {
        for (uint256 i = index; i < Registerreqcount; i++) {
            Registerrequests[i] = Registerrequests[i + 1];
        }
        if (Registerrequests[Registerreqcount].length > 0) {
            Registerrequests[Registerreqcount].pop();
        }
        Registerreqcount--;
    }

    function acceptBuy(address buyer, address seller, uint256 index) public {
        Landreg[] memory land = lands[seller];
        for (uint256 i = 0; i < land.length; i++) {
            lands[buyer].push(land[i]);
        }
        for (uint256 i = index; i < buyreqcount; i++) {
            Buyrequests[i] = Buyrequests[i + 1];
        }
        if (Buyrequests[buyreqcount].length > 0) {
            Buyrequests[buyreqcount].pop();
        }
        buyreqcount--;
    }

    function transferOwnership(
        uint256 id,
        address seller,
        address buyer
    ) public {
        lands[buyer].push(lands[seller][id]);
        for (uint256 i = id; i < lands[seller].length - 1; i++) {
            lands[seller][i] = lands[seller][i + 1];
        }
        lands[seller].pop();
    }

    function rejectBuy(uint256 index) public {
        for (uint256 i = index; i < buyreqcount; i++) {
            Buyrequests[i] = Buyrequests[i + 1];
        }
        if (Buyrequests[buyreqcount].length > 0) {
            Buyrequests[buyreqcount].pop();
        }
        buyreqcount--;
    }
}
