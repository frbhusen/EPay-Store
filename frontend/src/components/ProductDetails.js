import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item => item._id === product._id);
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('تم إضافة المنتج إلى السلة');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      alert('الرجاء إدخال الاسم والتعليق');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/products/${id}/review`, {
        user: userName,
        rating,
        comment
      });
      setUserName('');
      setComment('');
      setRating(5);
      fetchProduct();
      alert('تم إضافة التقييم بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء إضافة التقييم');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">جاري التحميل...</div>;
  }

  if (!product) {
    return <div className="error">المنتج غير موجود</div>;
  }

  const finalPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← العودة
      </button>

      <div className="product-details-wrapper">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          
          <div className="rating-display">
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={star <= Math.round(product.averageRating || 0) ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              ({product.averageRating || 0}) - {product.reviewCount || 0} تقييم
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="price-section">
            {product.discount > 0 && (
              <span className="original-price">{formatPrice(product.price)}</span>
            )}
            <span className="final-price">{formatPrice(finalPrice)}</span>
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            إضافة إلى السلة
          </button>

          <div className="category-info">
            <span><strong>الفئة:</strong> {product.category?.name}</span>
            {product.subCategory && (
              <span><strong>الفئة الفرعية:</strong> {product.subCategory?.name}</span>
            )}
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>التقييمات والآراء</h2>

        <form className="review-form" onSubmit={handleSubmitReview}>
          <h3>أضف تقييمك</h3>
          <div className="form-group">
            <label>الاسم</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div className="form-group">
            <label>التقييم</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= rating ? 'star filled clickable' : 'star clickable'}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>التعليق</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شاركنا رأيك..."
              rows="4"
              required
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
          </button>
        </form>

        <div className="reviews-list">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= review.rating ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('ar-SA')}
                </span>
              </div>
            ))
          ) : (
            <p className="no-reviews">لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
