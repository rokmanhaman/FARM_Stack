// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar'; 
import Home from './pages/Home';
import Productos from './pages/LastProductList';
import ProductEvolution from './pages/ProductEvolution';
import Contacto from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          
          <Route path="/productevolution" element={<ProductEvolution />} />
          <Route path="/contacto" element={<Contacto />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
