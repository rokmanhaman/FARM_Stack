from pydantic import BaseModel
from bson import ObjectId

class Products(BaseModel):

    _id : ObjectId
    producto : str
    precio_unitario : float
    precio_promos : float
    promos : str 
    precio_referencia : str
    url : str
    date : str
    prod_id : str