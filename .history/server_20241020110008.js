const crypto = require('crypto');

// Telegram bot token
const TELEGRAM_BOT_TOKEN = '7312020984:AAGYNRHCdeifvxwSDhcXgkqHOWS0UW3gCw0';
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
