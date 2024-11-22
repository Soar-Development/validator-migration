const { CosmWasmClient, SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet,DirectSecp256k1Wallet } = require('@cosmjs/proto-signing');
const { GasPrice } = require('@cosmjs/stargate');
const { PublicKey } = require('@solana/web3.js');

// Configuration
const rpcEndpoint = "https://rpc1.testnet.soarchain.com";
const contractAddress = "soar14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sg0qwca";
const faucetUrl = 'https://faucet.testnet.soarchain.com/credit';

// Helper function: Validate Solana address format
function validateBase58(address) {
  try {
    new PublicKey(address); // This throws an error if the address is invalid
    return true;
  } catch (e) {
    return false;
  }
}

// Faucet function: Request tokens for a Soar wallet
async function requestTokensFromFaucet(address) {
    try {
        const response = await fetch(faucetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, denom: 'utsoar' }), 
        });
    
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(`Faucet response for ${address}:`, data);
        } else {
          // The response is not JSON, read it as text
          const textResponse = await response.text();
          console.error(`Faucet request for ${address}: ${textResponse}`);
        }
      } catch (error) {
        console.error(`Failed to request tokens from the faucet for ${address}:`, error);
      }
  }

// Function: Create a wallet from hex private key
async function createWalletFromHex(privateKeyHex) {
  try {
    const privateKey = Buffer.from(privateKeyHex, "hex");
    const wallet = await DirectSecp256k1Wallet.fromKey(privateKey, "soar");
    console.log("Wallet successfully created from hex private key.");
    return wallet;
  } catch (error) {
    console.error("Error creating wallet from hex private key:", error.message);
    throw error;
  }
}

// Function: Query a Soar-to-Solana mapping
async function querySoarToSolana(soarAddress) {
  try {
    const client = await CosmWasmClient.connect(rpcEndpoint);
    const queryMsg = { get_solana_address: { soar_address: soarAddress } };
    const result = await client.queryContractSmart(contractAddress, queryMsg);
    console.log(`Solana address for ${soarAddress}:`, result);
    client.disconnect();
    return result;
  } catch (error) {
    console.error("Error querying Solana address:", error.message);
    throw error;
  }
}

// Function: Update a Solana address
async function updateSolanaAddress(privateKey, solanaAddress) {
    try {
      if (!validateBase58(solanaAddress)) {
        throw new Error("Invalid Solana address. Must be a valid Base58 string.");
      }
  
      let wallet;
  
      // Detect whether privateKey is hex or mnemonic
      if (/^[0-9a-fA-F]{64}$/.test(privateKey)) {
        // Private key is a 64-character hex string
        wallet = await createWalletFromHex(privateKey);
      } else {
        // Assume private key is a mnemonic
        wallet = await DirectSecp256k1HdWallet.fromMnemonic(privateKey, { prefix: "soar" });
      }
  
      const [account] = await wallet.getAccounts();
      console.log("Generated Soar wallet address:", account.address);
  
      // Request tokens from faucet if wallet creation is successful
      await requestTokensFromFaucet(account.address);
  
      const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {
        gasPrice: GasPrice.fromString("0utsoar"),
      });
  
      const executeMsg = { update_solana_address: { solana_address: solanaAddress } };
  
      const result = await client.execute(account.address, contractAddress, executeMsg, "auto", "Updating Solana address");
      console.log("Transaction result:", result);
  
      client.disconnect();
    } catch (error) {
      console.error("Error updating Solana address:", error.message);
      throw error;
    }
  }
  

// Export functions
module.exports = { updateSolanaAddress, querySoarToSolana, requestTokensFromFaucet };
