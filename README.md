# Web3 Authentication Frontend

A Next.js application for Web3 authentication using MetaMask, WalletConnect, and other providers.

## Features

- Multiple wallet support (MetaMask, WalletConnect, Coinbase Wallet)
- Sign-in with Ethereum (SIWE)
- NextAuth.js integration
- TypeScript support
- Responsive design
- Dark mode support

## Prerequisites

```shell
node >= 18.0.0
npm >= 9.0.0
```

## Installation

```shell
# Install dependencies
npm install
```

## Development

```shell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Environment Setup

Create a `.env.local` file:

```shell
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_SIGNATURE_MESSAGE="Sign this message to authenticate: "
NEXT_PUBLIC_ON_CHAIN_AUTH=false

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## Architecture

### Key Components

- `AuthService`: Handles Web3 authentication
- `useAuth`: Custom hook for auth state management
- `WalletAuth`: UI component for wallet connection
- `NextAuth`: Session management
- `RainbowKit`: Wallet connection UI

### Authentication Flow

1. User connects wallet
2. Signs authentication message
3. Contract verifies signature
4. NextAuth creates session
5. User authenticated

## Tech Stack

- Next.js 14
- TypeScript
- RainbowKit
- Wagmi
- Ethers.js
- NextAuth.js
- SIWE
- TailwindCSS

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # Shared components
├── config/          # Configuration files
├── modules/         # Feature modules
│   └── auth/        # Authentication module
├── services/        # Service layer
└── utils/           # Utility functions
```

## Security

- SIWE message signing
- CSRF protection
- Secure session management
- Environment variable protection
- Type safety

## License

MIT
