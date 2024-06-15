from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from model import Products
import asyncio
from typing import List





from database import (fetch_one_product, fetch_all_products, create_product)

#app object
app = FastAPI()

origins = [
    'http://localhost:3000',
    'https://localhost:3000'
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return  {"Ping" : "Pong"}

@app.get("/{prod_id}", response_model= List[Products])
async def get_product_by_id(prod_id: str = Path(..., min_length=7, max_length=7, description="un id de ejemplo es 3390322")):
    # Buscar los items en la colección que coincidan con el ID
    result = await fetch_one_product(prod_id)
    
    # Verificar si se encontraron elementos
    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Item not found")    



@app.get("/products/{pag_id}", response_model= List[Products])
async def get_products(pag_id: int = 1):
    prod_by_page = 5
    result = await fetch_all_products(pag_id, prod_by_page)
    # Verificar si se encontraron elementos
    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Item not found")    

