from model import Products
from pymongo import ASCENDING, DESCENDING
# MongoDB driver
from motor.motor_asyncio import AsyncIOMotorClient

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

async def fetch_all_products():
    products = []
    cursor = await collection.find({})
    async for document in cursor:
        products.append(Products(**document))
    return products

async def create_product(product):
    document = product
    result = await collection.insert_one(document)
    return document

