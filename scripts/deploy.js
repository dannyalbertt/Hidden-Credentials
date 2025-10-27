async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const HiddenCredentials = await ethers.getContractFactory("HiddenCredentials");
  const deployed = await HiddenCredentials.deploy();
  await deployed.deployed();

  console.log("HiddenCredentials deployed to:", deployed.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
