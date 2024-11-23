
# Soar Address Updater For Validators

This project provides a simple and user-friendly way to update Solana addresses for your Soar wallet. It includes robust validation, support for mnemonic phrases and hex private keys.

---

## Features

- **Supports Mnemonics and Hex Private Keys**: Choose your preferred format for the private key.
- **Validation**: Ensures the provided Solana address is valid.
- **Transaction Execution**: Updates the Solana address for the Soar wallet via a CosmWasm contract.

---

## Requirements

- Node.js installed (latest stable version recommended).
- Internet connection for interacting with the RPC and faucet.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Soar-Development/validator-migration.git
   cd validator-migration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the script executable:
   ```bash
   chmod +x setup.sh
   ```

---

## Usage

1. Run the setup script:
   ```bash
   ./setup.sh
   ```

2. Follow the prompts:
   - Choose whether to use a mnemonic or hex private key.
   - Enter your private key or mnemonic.
   - Provide the Solana address to associate with your Soar wallet.

3. Confirm the details and let the script handle the update.

---

## Example

### Running the Script

```bash
$ ./setup.sh
Welcome to the Soar Address Updater!
This script will help you update your Solana address for your Soar wallet.
------------------------------------------------------
Choose private key type:
1. Mnemonic (default)
2. Hex Private Key
Enter your choice [1/2]: 1
Enter your mnemonic phrase: symbol ticket rocket math fresh wash ...
Enter the Solana address: 2YSHivCkWuNTs97DWBm76czM1se44zmeyMHDpTp8XDt4
------------------------------------------------------
You have entered the following details:
Private Key Type: Mnemonic
Solana Address: 2YSHivCkWuNTs97DWBm76czM1se44zmeyMHDpTp8XDt4
------------------------------------------------------
Do you want to proceed? [y/N]: y
```

### Expected Output

```bash
Generated Soar wallet address: soar1abcd...
Faucet response for soar1abcd...: { success: true, amount: 100000 }
Transaction result: { txhash: 'A1B2C3D4E5...' }
```

---

## Troubleshooting

### Invalid Solana Address

```bash
Invalid Solana address. Must be a valid Base58 string.
```

Ensure the Solana address is correctly formatted and valid.

### Faucet Request Failure

```bash
Failed to request tokens from the faucet for soar1abcd...: Faucet request failed with status: 500
```

Check your network connection and ensure the faucet service is operational.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For support or inquiries, please contact us from our Discord or Telegram Channels.
