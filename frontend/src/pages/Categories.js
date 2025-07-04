import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductModal from '../components/ProductModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      
     
      const uniqueCategories = response.data.filter((category, index, self) =>
        index === self.findIndex(c => c.name === category.name)
      );
      
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleProductAdded = () => {
    fetchCategories();
    setShowModal(false);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading categories...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>

        {/* Single row with horizontal scroll if needed */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <div key={category.id || index} className="bg-white rounded-lg shadow-md p-6 min-w-[300px] flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Products: {category.product_count}
              </p>
              <button
                onClick={() => handleAddProduct(category)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <ProductModal
            category={selectedCategory}
            onClose={() => setShowModal(false)}
            onProductAdded={handleProductAdded}
          />
        )}
      </div>
    </Layout>
  );
};

export default Categories;