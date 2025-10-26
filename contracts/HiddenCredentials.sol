pragma solidity ^0.8.19;

contract HiddenCredentials {
    struct Record {
        address owner;
        bytes credentialCiphertext;
        bytes verificationCiphertext;
        uint256 timestamp;
    }

    mapping(uint256 => Record) public records;
    uint256 public nextId;

    event CredentialSubmitted(uint256 indexed id, address indexed owner, uint256 timestamp);
    event VerificationSubmitted(uint256 indexed id, bytes verificationCiphertext, uint256 timestamp);

    function submitCredential(bytes calldata credentialCiphertext) external returns (uint256) {
        uint256 id = nextId++;
        records[id] = Record({
            owner: msg.sender,
            credentialCiphertext: credentialCiphertext,
            verificationCiphertext: "",
            timestamp: block.timestamp
        });
        emit CredentialSubmitted(id, msg.sender, block.timestamp);
        return id;
    }

    function submitVerification(uint256 id, bytes calldata verificationCiphertext) external {
        require(records[id].owner != address(0), "Record not found");
        records[id].verificationCiphertext = verificationCiphertext;
        emit VerificationSubmitted(id, verificationCiphertext, block.timestamp);
    }

    function getRecord(uint256 id) external view returns (Record memory) {
        return records[id];
    }
}
