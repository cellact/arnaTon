# Arnacon - Blockchain-based Telecommunication App

Welcome to **Arnacon**, a decentralized telecommunication app that leverages blockchain technology for secure and efficient communication. This application offers seamless integration with **Telegram**, support for payments via **Ton blockchain**, and various other features, enabling enhanced security, privacy, and functionality in communication.

## Features

### 1. Telegram Account Bot Verifier
- We’ve added a **Telegram Bot Verifier** to authenticate Telegram accounts within the app.
- This enables users to **verify their identity** securely using their Telegram account for further interactions on the platform.
  
### 2. Call Support via Telegram and Emails (Android)
- Users can now initiate voice calls to other verified Telegram accounts, directly from within the app.
- **Email integration**: Users can also make calls to email-linked accounts (currently supported on **Android**).
- Ensures seamless connectivity between contacts via Telegram and email.

### 3. Payment Support with Ton Blockchain via TonKeeper
- **Ton blockchain integration** is now enabled for secure payment transactions.
- Payment processing happens via the **TonKeeper app**, ensuring decentralized and secure handling of funds.
- This feature makes the platform useful for both communication and financial transactions, all within the secure Ton blockchain environment.

### 4. Transaction Confirmation and Verifier
- Every transaction processed via Ton blockchain comes with **transaction confirmation**.
- The app also includes a **transaction verifier** that ensures every payment is correctly validated and securely recorded on the blockchain.

### 5. Working Process Overview
- **Telegram Identity Verification**: Users verify their Telegram identity using the Telegram bot integrated into the app.
- **Making Calls**: Once the user’s Telegram account is verified, they can initiate voice calls to any other Telegram-verified user or email-linked contact on Android.
- **Payments**: Users can make payments for services using Ton blockchain via TonKeeper. The transaction details are confirmed in-app.
- **Transaction Verification**: After each transaction, the app verifies the payment on the blockchain, ensuring transparency and security.
  
## Technology Stack
- **Backend**: Integrated with the **Telegram Bot API** and **Ton blockchain** for transaction handling.
- **Frontend**: Built with **React Native** for cross-platform compatibility, focusing on Android for call support.
- **Blockchain**: **Ton blockchain** for payment processing and **TonKeeper** for wallet integration.
  
## Usage Instructions

1. **Telegram Account Verification**: 
   - Open the app and verify your Telegram account using the bot verifier.
   
2. **Calling**:
   - Navigate to the contact list to call another verified Telegram user or initiate a call to a contact's email (Android support only).

3. **Payments**:
   - Go to the **Payments** section in the app, choose the service, and complete the payment using **TonKeeper**.

4. **Transaction Verification**:
   - After completing the payment, the app will display the transaction confirmation and verification on the blockchain.

## Contribution
We welcome contributions from the community to improve Arnacon. Feel free to submit a pull request or create an issue to report bugs or suggest new features.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

### Happy Hacking! 💻