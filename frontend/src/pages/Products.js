import React, { useState, useEffect } from 'react';
import api from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;