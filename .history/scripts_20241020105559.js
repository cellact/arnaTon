// We added to our project-

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
  <button className="buttons"  onClick={open_ton}>Pay Now With $TON</button>
