from fastapi import FastAPI, HTTPException, Path, Query
from fastapi.middleware.cors import CORSMiddleware
from model import Products
from typing import List, Annotated, Union


from database import (fetch_one_product, fetch_all_products, create_product, get_last_item_date)

#app object
app = FastAPI()

last_item_date, next_day= await get_last_item_date()

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

@app.get("product/{prod_id}", response_model= List[Products])
async def get_product_by_id(prod_id: str = Path(..., min_length=7, max_length=7, description="un id de ejemplo es 3390322")):
    # Buscar los items en la colección que coincidan con el ID
    result = await fetch_one_product(prod_id)
    
    # Verificar si se encontraron elementos
    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Item not found")    



@app.get("/products/", response_model= List[Products])
async def get_products(
    pag_id: int = Query(1, description="Página actual"),
    prod_by_page: int = Query(5, description="Número de productos por página"),
    q: Annotated[
        Union[str, None],
        Query(
            alias="product-name-query",
            title="Query string",
            description="Query string for the items to search in the database that have a good match",
            min_length=3,
            max_length=20,
            deprecated=False,
        ),
    ] = None,
    day: Annotated[
        Union[str, None],
        Query(
            ...,
            description="Fecha en formato YYYY-MM-DD",
            regex=r"^\d{4}-\d{2}-\d{2}$",
            alias="item-day",
            title="Fecha de consulta",
            min_length=10,
            max_length=10,
            example = last_item_date
        ),
    ] = None,
):


    result = await fetch_all_products(pag_id, prod_by_page, q, day)
    # Verificar si se encontraron elementos
    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Item not found")    

