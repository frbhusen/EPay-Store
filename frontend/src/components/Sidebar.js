import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubCategories, setExpandedSubCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, subCategoriesRes, productsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/subcategories'),
        api.get('/products')
      ]);
      setCategories(categoriesRes.data);
      setSubCategories(subCategoriesRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubCategory = (subCategoryId) => {
    setExpandedSubCategories(prev =>
      prev.includes(subCategoryId)
        ? prev.filter(id => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const getSubCategoriesForCategory = (categoryId) => {
    return subCategories.filter(sub => sub.category?._id === categoryId);
  };

  const getProductsForSubCategory = (subCategoryId) => {
    return products.filter(prod => prod.subCategory?._id === subCategoryId);
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>القوائم</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="sidebar-content">
          {categories.map(category => {
            const categorySubCategories = getSubCategoriesForCategory(category._id);
            const isExpanded = expandedCategories.includes(category._id);
            
            return (
              <div key={category._id} className="sidebar-category">
                <div 
                  className="category-header"
                  onClick={() => toggleCategory(category._id)}
                >
                  <span>{category.name}</span>
                  <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                </div>
                
                {isExpanded && categorySubCategories.length > 0 && (
                  <div className="subcategories-list">
                    {categorySubCategories.map(subCategory => {
                      const subCategoryProducts = getProductsForSubCategory(subCategory._id);
                      const isSubExpanded = expandedSubCategories.includes(subCategory._id);
                      
                      return (
                        <div key={subCategory._id} className="sidebar-subcategory">
                          <div 
                            className="subcategory-header"
                            onClick={() => toggleSubCategory(subCategory._id)}
                          >
                            <span>{subCategory.name}</span>
                            {subCategoryProducts.length > 0 && (
                              <span className={`arrow ${isSubExpanded ? 'expanded' : ''}`}>▼</span>
                            )}
                          </div>
                          
                          {isSubExpanded && subCategoryProducts.length > 0 && (
                            <div className="products-list">
                              {subCategoryProducts.map(product => (
                                <div 
                                  key={product._id} 
                                  className="sidebar-product"
                                  onClick={() => handleProductClick(product._id)}
                                >
                                  {product.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
