import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LastProductList.css';
import {PaginationButtons} from '../components/PaginationButtons';

function LastProductList() {
  const [productos, setProductos] = useState([]);
  const [pag_num, setPagNum] = useState(1); // Estado para almacenar el número de página
  const [totalPages, setTotalPages] = useState(1); // Estado para almacenar el número total de páginas

  // Función para manejar el cambio de página
  const handlePageChange = (newPageNum) => {
    setPagNum(newPageNum); // Actualiza el estado de pag_num
  };

  // Función para obtener los productos
  const fetchData = async (pageNum) => {
    try {
      let url = `http://127.0.0.1:8000/products/?pag_id=${pageNum}&prod_by_page=20`;
      const response = await axios.get(url);
      const formattedProductos = response.data.map(producto => ({
        ...producto,
        date: new Date(producto.date).toISOString().slice(0, 10) // Formatea la fecha a 'YYYY-MM-DD'
      }));
      setProductos(formattedProductos);
      // Actualiza el número total de páginas basado en la respuesta
      setTotalPages(Math.ceil(response.data.count / 20)); // Suponiendo que 'count' es el total de productos
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Llamar a fetchData al cargar el componente inicialmente
  useEffect(() => {
    fetchData(pag_num);
  }, [pag_num]);


  return (
    <React.Fragment>
      <div className="row">
        <PaginationButtons pag_num={pag_num} totalPages={totalPages} handlePageChange={handlePageChange} />

      </div>
      <div className="LastProductList">
        <h1>Productos</h1>
        <table className="table">  
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
          <tbody>
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
      </div>
    </React.Fragment>
  );
}

export {LastProductList};
