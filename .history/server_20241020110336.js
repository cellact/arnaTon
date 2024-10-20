import dotenv from 'dotenv';

// Telegram AUTH
const crypto = require('crypto');
dotenv.config(); // Make sure this line is right at the top

// Telegram bot token
const TELEGRAM_BOT_TOKEN = process.env.API_KEY;
const functions = require('@google-cloud/functions-framework');

// Register an HTTP function with the Functions Framework
functions.http('helloHttp', (req, res) => {
  // Your code here

  const authData = req.query; // Get the data from query parameters

  // Check if all necessary parameters are present
  if (!authData.hash || !authData.auth_date || !authData.id || !authData.first_name || !authData.walletAddress || !authData.username) {
    return res.status(400).json({ error: 'Invalid data received' });
  }
    const walletAddress = authData.walletAddress
    console.log("wallet addr: ", walletAddress);
    delete authData.walletAddress;
    console.log("wallet addr: ", walletAddress);
  // Create data string for validation
  const checkString = Object.keys(authData)
    .filter(key => key !== 'hash') // Exclude the hash itself
    .sort() // Sort the keys
    .map(key => `${key}=${authData[key]}`) // Format into key=value
    .join('\n'); // Join with newline
    console.log("auth data: ", authData)
    console.log("check sgtring: ", checkString)
  // Compute the HMAC-SHA256 hash
  const secretKey = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const computedHash = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

  console.log("hash: ", computedHash)
  console.log("secret: ", secretKey)

  // Compare the computed hash with the received hash
  if (computedHash === authData.hash) {
    // Authenticated successfully
    console.log("wallet addr: ", walletAddress)

    const dataToSend = {
        uuid_to_sign:"string",
        ens:authData.username,
        domain:"telegram",
        user_address:walletAddress,
        coupon:""
    }

    fetch("https://us-central1-arnacon-nl.cloudfunctions.net/buy_ens_w_encrypt", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      return res.status(200).json({ success: true, message: `User verified: ${authData.first_name} ${walletAddress}` });
    })
    .catch(error => {
        return res.status(403).json({ error: 'failed to fetch' });
    });
    
  } else {
    // Authentication failed
    return res.status(403).json({ error: 'Invalid authentication' });
  }
  // Send an HTTP response
});




// And a transaction confirmation-

const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', async (req, res) => {
    await getTransactions()
    res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
});

const { mnemonicToWalletKey } = require("@ton/crypto");
const { getHttpEndpoint } = require("@orbs-network/ton-access");
const { WalletContractV4, TonClient, fromNano } = require("@ton/ton");

function decodeHexString(hexString) {
  // Remove the prefix x{ and the suffix }
  const cleanHexString = hexString.replace(/^x{/, '').replace(/}$/, '');

  // Convert the hex string to a Buffer
  const buffer = Buffer.from(cleanHexString, 'hex');

  // Convert the buffer to a UTF-8 string
  const decodedString = buffer.toString('utf-8');

  return decodedString;
}


async function getTransactions() {
    const mnemonic = "earth source junk dizzy potato anger consider hand service below chuckle lab tool million just sustain plastic annual voyage just present humble spoil faculty";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    // Initialize TON RPC client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    console.log("key:", wallet.address);

    // Query balance from chain
    const balance = await client.getBalance(wallet.address);
    console.log("balance:", fromNano(balance));

    // Query seqno from chain
    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    console.log("seqno:", seqno);

    // Fetch transactions to the wallet address in the last 30 seconds

    const recentTransactions = await client.getTransactions(wallet.address, {
      limit: 1
    });
    
    // filteredTransactions now contains only the transactions from the last 30 seconds
    console.log(recentTransactions);
    recentTransactions.forEach(tx => {
      // console.log(tx)
      const hexBody = tx.inMessage.body; // Assuming this is in hex
      const decodedResult = decodeHexString(hexBody.toString()).replace(/\x00+/g, '');
      console.log("Comment in Transaction:", decodedResult);
      console.log("Amount in Transaction:", tx.totalFees.coins);

      fetch('https://us-central1-arnacon-nl.cloudfunctions.net/after_ton_confirmation', {
          method: 'POST', // Change to 'GET' if required
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: decodedResult
          }),
      })
      .then(async response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const res = await response.json();
          console.log(res);
          return res;
      })
      .then(data => {
          console.log('Success:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
      
      }
    )}