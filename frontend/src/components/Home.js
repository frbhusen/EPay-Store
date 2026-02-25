import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [mostVisited, setMostVisited] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setMostVisited(productsRes.data.filter(p => p.mostVisited));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubCategoriesForCategory = (categoryId) => {
    return subCategories.filter(sub => sub.category?._id === categoryId);
  };

  const getProductsForSubCategory = (subCategoryId) => {
    return products.filter(prod => prod.subCategory?._id === subCategoryId).slice(0, 3);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getShortDescription = (text, maxLen = 90) => {
    if (!text) return '';
    const trimmed = text.trim();
    if (trimmed.length <= maxLen) return trimmed;
    return `${trimmed.slice(0, maxLen - 3)}...`;
  };

const renderProduct = (product) => {
    const finalPrice = product.price * (1 - (product.discount || 0) / 100);
    
    return (
      <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} />
          {product.discount > 0 && (
            <div className="discount-badge">-{product.discount}%</div>
          )}
        </div>
        <div className="product-info">
          <h4>{product.name}</h4>
          {product.description && (
            <p className="product-desc-short">{getShortDescription(product.description)}</p>
          )}
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={star <= Math.round(product.averageRating || 0) ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-count">({product.reviewCount || 0})</span>
          </div>
          <div className="product-price">
            {product.discount > 0 && (
              <span className="original-price">{formatPrice(product.price)}</span>
            )}
            <span className="final-price">{formatPrice(finalPrice)}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading-container">جاري التحميل...</div>;
  }

  return (
    <div className="home-container-dark">
      {/* Hero Section */}
      <section className="hero-section-dark">
        <div className="hero-content">
          <h1>مرحباً بك في متجر EPay</h1>
          <p>أفضل المنتجات والخدمات الإلكترونية</p>
        </div>
      </section>

      {/* Most Visited Products */}
      {mostVisited.length > 0 && (
        <section className="most-visited-section">
          <div className="section-header">
            <h2>الأكثر زيارة</h2>
            <div className="section-divider"></div>
          </div>
          <div className="products-grid">
            {mostVisited.map(renderProduct)}
          </div>
        </section>
      )}

      {/* Categories with Hierarchical Structure */}
      <section className="categories-section">
        {categories.map(category => {
          const categorySubCategories = getSubCategoriesForCategory(category._id);
          
          if (categorySubCategories.length === 0) return null;

          return (
            <div key={category._id} className="category-block">
              <div className="category-header">
                <h2>{category.name}</h2>
                <div className="section-divider"></div>
              </div>

              {categorySubCategories.map(subCategory => {
                const subCategoryProducts = getProductsForSubCategory(subCategory._id);
                
                if (subCategoryProducts.length === 0) return null;

                return (
                  <div key={subCategory._id} className="subcategory-block">
                    <h3>{subCategory.name}</h3>
                    <div className="products-grid">
                      {subCategoryProducts.map(renderProduct)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
