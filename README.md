# 📜 Ethereum Todo List DApp

A decentralized ToDo List application built on the Ethereum blockchain. This project demonstrates how to interact with smart contracts from a web browser, handle blockchain transactions, and manage state using the Truffle suite.

## 🏗️ Project Architecture

The application follows a standard Web3 architecture where the frontend communicates with the blockchain through a provider (MetaMask).

## 🚀 Technologies Used

- **Ethereum & Blockchain**: A decentralized, distributed ledger that stores all tasks immutably.
- **Solidity**: The smart contract programming language used to write the TodoList logic.
- **Ganache**: A personal blockchain for rapid Ethereum distributed application development.
- **Truffle Framework**: A world-class development environment and testing framework for Ethereum.
- **Web3.js**: The JavaScript library used to talk to the Ethereum blockchain.
- **MetaMask**: A browser extension that acts as an Ethereum wallet and a bridge between the browser and the blockchain.
- **Node.js**: The runtime environment for our development tools and local server.
- **Mocha & Chai**: Used for unit testing the smart contracts to ensure security and reliability.

## 🧠 Key Web3 Concepts Used

### 1. Smart Contracts
A self-executing contract with the terms of the agreement directly written into code. In this project, `TodoList.sol` manages the logic for creating and toggling tasks.

### 2. ABI (Application Binary Interface)
When the Solidity code is compiled, it generates a JSON file. This ABI acts as a map that tells JavaScript which functions are available in the contract and how to call them.

### 3. Providers & Signers
- **Provider (Web3)**: Read-only access to the blockchain (e.g., getting the task count).
- **Signer (MetaMask)**: Required for "Write" operations (e.g., creating a task). It prompts the user to sign a transaction and pay Gas Fees.

### 4. Gas Fees
Every "Write" operation on the blockchain requires computational power. Users pay "Gas" in ETH to miners to process these transactions.

## 🛠️ How the Flow Works

### Initialization (App.load)
1. **loadWeb3**: Detects if MetaMask is installed and connects the browser to the Ethereum network.
2. **loadAccount**: Fetches the user's wallet address from MetaMask.
3. **loadContracts**: Loads the compiled `TodoList.json` and initializes it using TruffleContract.
4. **render**: Updates the UI. It fetches tasks from the blockchain and builds the HTML list dynamically.

### Interacting with the Blockchain
- **Read State**: We call `App.todoList.tasks(i)` to fetch data. This is free and near-instant.
- **Write State**: When calling `createTask` or `toggleCompleted`, we pass `{ from: App.account }`. MetaMask pops up to ask for permission, and the data is only updated once the block is mined.

## 📋 Installation & Setup

1. **Clone the Repo**:
   ```bash
   git clone <your-repo-url>
   cd blockchain-todo-list
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Ganache**: 
   Open the Ganache desktop app and ensure it's running on `127.0.0.1:7545` (or as configured in `truffle-config.js`).

4. **Compile & Migrate Contracts**:
   ```bash
   truffle migrate --reset
   ```

5. **Run Tests**:
   ```bash
   truffle test
   ```

6. **Launch the Frontend**:
   ```bash
   npm run dev
   ```
   (Ensure MetaMask is connected to your Ganache RPC network).

## 🧪 Testing with Mocha & Chai

The project includes a robust testing suite in the `test/` folder.

- **Mocha** provides the `describe` and `it` structure to organize tests.
- **Chai** provides the `assert` library to verify blockchain states (e.g., checking if a task's content is correct).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues/).

## 👨‍💻 Author

Your Name - [SwasTik Sharma](https://www.linkedin.com/in/swastik-sharma-943615290)

