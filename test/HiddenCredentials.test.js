const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HiddenCredentials contract", function () {
  let Hidden, hidden, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Hidden = await ethers.getContractFactory("HiddenCredentials");
    hidden = await Hidden.deploy();
    await hidden.deployed();
  });

  it("submitCredential and submitVerification works", async function () {
    const fakeCipher = ethers.utils.toUtf8Bytes("fake-enc-credential");
    const tx = await hidden.connect(addr1).submitCredential(fakeCipher);
    await tx.wait();

    const id = 0;
    const rec = await hidden.getRecord(id);
    expect(rec.owner).to.equal(addr1.address);

    const fakeVerification = ethers.utils.toUtf8Bytes("fake-enc-true");
    await expect(hidden.connect(addr1).submitVerification(id, fakeVerification))
      .to.emit(hidden, "VerificationSubmitted");

    const rec2 = await hidden.getRecord(id);
    expect(rec2.verificationCiphertext.length).to.be.greaterThan(0);
  });
});
