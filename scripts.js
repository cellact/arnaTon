
// Changes in projects-
// https://github.com/daBatmanCoder/arnacon_shop
// Arnacon GCP projects

// We added to our project-
import dotenv from 'dotenv';

// Telegram widget authenticator script
const telegramURL = "https://telegram-auth-two.vercel.app/?user_address=" + userAddress;

// Ton button scripts
const open_ton = async () => {
    
    console.log("openTON");
    
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    console.log("uuid is: " + uuid);

    let typeOfProduct = getProductType(name);

    // typeOfProduct = "TON";

    const jsonForURL = {
      "package_type": typeOfProduct,
      "customer_id":uuid,
      "password":"",
      "packageId": itemId,
      "packageName": name,
      "transactionPrice": transaction_price,
      "subscriptionPrice": subscription_price,
      "user_address": userAddress,
      "uuid_to_sign": uuid,
      "currency": currency,
      "success_url": success_url,
      "failure_url": "https://main-failure-page-309305771885.europe-west4.run.app/",
      "isTon": true
    }



    await sendJsonToServer(jsonForURL);
    
    const url = "ton://transfer/0QDygElEywPigDU_GIBNMYgQinv6bQZfzFRcbrX0xKx-cLqU?amount=" + 100000000  + "&text="+ uuid + "&callback=arnacon://verify"
    requestTONSig(url);

  };
  
//   a new button-


  // Telegram support-



