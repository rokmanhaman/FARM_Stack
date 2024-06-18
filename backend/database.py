from model import Products
from pymongo import ASCENDING, DESCENDING
# MongoDB driver
from motor.motor_asyncio import AsyncIOMotorClient

from datetime import datetime, timedelta



uri ="mongodb://localhost:27017"

client = AsyncIOMotorClient(uri)

database = client.supermamidb
collection = database.smProducts


async def get_last_item_date():
    # Obtener el último item ordenando por la fecha de forma descendente y limitando a 1
    cursor = collection.find().sort("date", -1).limit(1)
    async for document in cursor:
        last_item_date = document["date"].split("T")[0]
        last_item_date_datetime = datetime.strptime(last_item_date, '%Y-%m-%d')
        next_day = (last_item_date_datetime + timedelta(days=1)).strftime('%Y-%m-%d')
    return last_item_date, next_day


async def fetch_one_product(prod_id):
    cursor = collection.find({"prod_id": prod_id}).sort("date", DESCENDING)
    results = []
    async for document in cursor:
        # Convertir ObjectId a string antes de agregarlo a la lista de resultados
        document["_id"] = str(document["_id"])
        results.append(document)
    return results

async def fetch_all_products(page_number, page_size, product_q, product_day):

    skip = (page_number - 1) * page_size
            
    # Construir la consulta
    ## DATE
    if product_day is None:

        last_item_date, next_day= get_last_item_date()

        query = {"date": {"$gte": last_item_date, "$lt": next_day }}
    
    else:
        query = {"date": {"$gte": product_day, "$lt": ((datetime.strptime(product_day, '%Y-%m-%d'))+ timedelta(days=1)).strftime('%Y-%m-%d')}}
    ## PRODUCT_Q
    if product_q:
        query["producto"] = {"$regex": product_q, "$options": "i"}
    

    print("despues")
    print(query)
    print(type(query))
    # Realizar la consulta con skip y limit
    cursor = collection.find(query).skip(skip).limit(page_size)

    resultados = await cursor.to_list(length=None)
    return resultados



async def create_product(product):
    document = product
    result = await collection.insert_one(document)
    return document

