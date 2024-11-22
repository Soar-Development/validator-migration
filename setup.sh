#!/bin/bash

# Check if Node.js is installed
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: Node.js is not installed. Please install Node.js to proceed.' >&2
  exit 1
fi

# Install npm dependencies if not already installed
if ! [ -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Welcome message
echo "Welcome to the Soar Address Updater!"
echo "This script will help you update your Solana address for your Soar wallet."
echo "------------------------------------------------------"

# Prompt for private key type with defaults
echo "Choose private key type:"
echo "1. Mnemonic (default)"
echo "2. Hex Private Key"
read -r -p "Enter your choice [1/2]: " choice
choice=${choice:-1} # Default to 1 if no input

# Handle private key input
if [ "$choice" -eq 1 ]; then
  read -r -p "Enter your mnemonic phrase: " mnemonic
  privateKey="$mnemonic"
elif [ "$choice" -eq 2 ]; then
  read -r -p "Enter your hex private key: " hexKey
  if [[ ! "$hexKey" =~ ^[0-9a-fA-F]{64}$ ]]; then
    echo "Invalid Hex Private Key format. A valid hex key must be 64 hexadecimal characters."
    exit 1
  fi
  privateKey="$hexKey"
else
  echo "Invalid choice. Please select 1 or 2."
  exit 1
fi

# Prompt for Solana address without validation
read -r -p "Enter the Solana address: " solanaAddress

# Confirm the entered details
echo "------------------------------------------------------"
echo "You have entered the following details:"
echo "Private Key Type: $([ "$choice" -eq 1 ] && echo "Mnemonic" || echo "Hex Private Key")"
echo "Solana Address: $solanaAddress"
echo "------------------------------------------------------"
read -r -p "Do you want to proceed? [y/N]: " confirm
confirm=${confirm:-n}

if [[ "$confirm" =~ ^[Yy]$ ]]; then
  echo "Proceeding with the update..."
else
  echo "Operation cancelled."
  exit 0
fi

# Call the update function
node -e "
const { updateSolanaAddress } = require('./script');
updateSolanaAddress('$privateKey', '$solanaAddress');
"