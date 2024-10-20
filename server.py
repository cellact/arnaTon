
# // And for TON payment-

from google.cloud import firestore
import aiohttp
import asyncio

# Stripe webhook secret
 
async def async_post(url, data):
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as response:
            return await response.read()

db = firestore.Client()


@functions_framework.http
def hello_http(request):
    
    request_json = request.get_json(silent=True)
    request_args = request.args

    customer_ref = request_json['customer_id']
    print(customer_ref)
    order_ref = db.collection('installProduct').document(customer_ref)
            
    order_doc = order_ref.get()
    order_data = order_doc.to_dict()
    print("prder data is: " + str(order_data))
    package_type = order_data.get('package_type')

    package_actions = {
        'AirAlo_eSim': handle_airalo_esim,
        'Telnyx_Package': handle_telnyx_package,
        'web2_ens': handle_web2_ens,
        'normal_gsm': handle_normal_gsm
    }

    # Function to execute the action based on package type
    action = package_actions.get(package_type, handle_unknown)  # default to handle_unknown if package_type is not found
    action(order_data)  # Execute the function associated with the package type

    return "Handling", 200


def handle_unknown(document_dict):
    print("Handling unknown package type")


def handle_airalo_esim(document_dict):
    print("Handling AirAlo eSim package")

def handle_telnyx_package(document_dict):
    
    print("Handling Telnyx Package")
    url = "https://us-central1-arnacon-nl.cloudfunctions.net/buy_gsm_telnyx"
    asyncio.run(async_post(url, document_dict))


def handle_web2_ens(document_dict):
    
    print("Handling web2 ens package")
    url = "https://us-central1-arnacon-nl.cloudfunctions.net/buy_ens_w_encrypt"
    asyncio.run(async_post(url, document_dict))


def handle_normal_gsm(document_dict):

    print("Handling normal GSM package")
    url = "https://us-central1-arnacon-nl.cloudfunctions.net/buy_gsm"
    asyncio.run(async_post(url, document_dict))

