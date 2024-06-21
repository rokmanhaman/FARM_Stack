// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {Navbar} from './Navbar'; 
import {Home} from './pages/Home';
import {LastProductList} from './pages/LastProductList';
import {ProductEvolution} from './pages/ProductEvolution';
import {Contact} from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<LastProductList />} />
          
          <Route path="/productevolution" element={<ProductEvolution />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
