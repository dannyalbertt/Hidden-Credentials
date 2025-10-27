const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("Set CONTRACT_ADDRESS in env");
    return;
  }
  const Hidden = await hre.ethers.getContractFactory("HiddenCredentials");
  const hidden = Hidden.attach(contractAddress);

  const id = 0;
  const rec = await hidden.getRecord(id);
  console.log("Record:", {
    owner: rec.owner,
    credentialCipherHex: Buffer.from(rec.credentialCiphertext).toString('hex'),
    verificationCipherHex: Buffer.from(rec.verificationCiphertext).toString('hex'),
    timestamp: rec.timestamp.toString()
  });
}

main().catch(e => { console.error(e); process.exit(1); });
