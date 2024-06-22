import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LastProductList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products/?pag_id=1&prod_by_page=20');
        const formattedProductos = response.data.map(producto => ({
          ...producto,
          date: new Date(producto.date).toISOString().slice(0, 10) // Formatea la fecha a 'YYYY-MM-DD'
        }));
        setProductos(formattedProductos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  return (
    <React.Fragment>
      <h1>Productos</h1>
      <table className="table table table-success table-striped">  
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Precio Promos</th>
            <th scope="col">Precio Referencia</th>
            <th scope="col">Fecha</th>
            <th scope="col">ID Producto</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {productos.map((producto, index) => (
            <tr key={producto.prod_id}>
              <th scope="row">{index + 1}</th>
              <td>{producto.producto}</td>
              <td>{producto.precio_unitario}</td>
              <td>{producto.precio_promos}</td>
              <td>{producto.precio_referencia}</td>
              <td>{producto.date}</td>
              <td>{producto.prod_id}</td>
              <td><a href={producto.url} target="_blank" rel="noopener noreferrer">Enlace</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export { LastProductList };
