from model import Products
from pymongo import ASCENDING, DESCENDING
# MongoDB driver
from motor.motor_asyncio import AsyncIOMotorClient

from datetime import datetime, timedelta

uri ="mongodb://localhost:27017"

client = AsyncIOMotorClient(uri)

database = client.supermamidb
collection = database.smProducts


async def fetch_one_product(prod_id):
    cursor = collection.find({"prod_id": prod_id}).sort("date", DESCENDING)
    results = []
    async for document in cursor:
        # Convertir ObjectId a string antes de agregarlo a la lista de resultados
        document["_id"] = str(document["_id"])
        results.append(document)
    return results

async def fetch_all_products(page_number, page_size):
    products = []

    last_item = collection.find().sort({ "date": -1 }).limit(1)

    async for document in last_item:
        last_item_date = document["date"].split("T")[0] 

    if last_item_date:
        # Convertir la cadena de fecha en objeto datetime
        day_datetime = datetime.strptime(last_item_date, '%Y-%m-%d')
        
        # Calcular la fecha del siguiente día
        next_day = (day_datetime + timedelta(days=1)).strftime('%Y-%m-%d')

        # Construir la consulta
        query = {
            "date": {
                "$gte": day_datetime,
                "$lt": next_day
            }
        }
        
        skip = (page_number - 1) * page_size

        print(f"\nday_datetime: {last_item_date}")
        print(f"\nnext_day: {next_day}")
        print(f"\npage_number: {page_number}")
        print(f"\npage_size: {page_size}")
        print(f"\nskip: {skip}")
        # Calcular el número de documentos a saltar
        

        # Realizar la consulta con skip y limit
        cursor = collection.find(query).skip(skip).limit(page_size)
        

        # Obtener los documentos en forma de lista
        async for document in cursor:
            print(Products(**document))
            products.append(Products(**document))

    return products

async def create_product(product):
    document = product
    result = await collection.insert_one(document)
    return document

