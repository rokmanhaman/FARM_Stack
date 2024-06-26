import React, { useState } from 'react';
import '../styles/Navbar.css'; // Importar el archivo CSS donde están definidos los estilos

function Navbar() {
  const [activeItem, setActiveItem] = useState('Home'); // Estado para mantener el elemento activo

  // Función para manejar el clic en los elementos del menú
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${activeItem === 'Home' ? 'active-nav-item' : ''}`}>
              <a className="nav-link" href="/" onClick={() => handleItemClick('Home')}>
                Home
              </a>
            </li>
            <li className={`nav-item ${activeItem === 'LastProductList' ? 'active-nav-item' : ''}`}>
              <a className="nav-link" href="/products" onClick={() => handleItemClick('LastProductList')}>
                LastProductList
              </a>
            </li>
            <li className={`nav-item ${activeItem === 'ProductEvolution' ? 'active-nav-item' : ''}`}>
              <a className="nav-link" href="/productevolution" onClick={() => handleItemClick('ProductEvolution')}>
                ProductEvolution
              </a>
            </li>
            <li className={`nav-item ${activeItem === 'Contact' ? 'active-nav-item' : ''}`}>
              <a className="nav-link" href="/contact" onClick={() => handleItemClick('Contact')}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export {Navbar};
