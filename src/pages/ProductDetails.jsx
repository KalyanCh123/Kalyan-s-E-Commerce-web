import { useParams } from "react-router-dom";
import products from "../data/products";
import { useState } from "react";

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const relatedProducts = products.filter((p) => product.related?.includes(p.id));
    if (!product) { return <h2>Product Not Found</h2>; }
    const stockColor = product.stock > 10 ? "green" : product.stock > 0 ? "orange" : "red";

    return (
        <div className="product-details-container">
            <div className="product-details-grid">
                <div className="image-section">
                    <div className="thumbnail-list">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt=""
                                onClick={() => setSelectedImage(img)}
                                className="thumbnail"
                            />
                        ))}
                    </div>
                    <div className="main-image-wrapper">
                        {product.discount > 0 && (
                            <div className="discount-badge">
                                {product.discount}% OFF
                            </div>
                        )}
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="main-image"
                        />
                    </div>
                </div>
                <div className="info-section">
                    <h2>{product.title}</h2>
                    <p className="brand">Brand: {product.brand}</p>
                    <p className="sku">SKU: {product.sku}</p>
                    <div className="price-section">
                        {product.originalPrice && (
                            <span className="original-price">
                                ${product.originalPrice}
                            </span>
                        )}
                        <span className="price">${product.price}</span>
                    </div>
                    <p style={{ color: stockColor }}>
                        {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                    </p>
                    <p className="description">{product.description}</p>
                    <button className="add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="related-section">
                <h3>Related Products</h3>
                <div className="related-grid">
                    {relatedProducts.map((item) => (
                        <div key={item.id} className="related-card">
                            <img src={item.images[0]} alt="" />
                            <p>{item.title}</p>
                            <span>${item.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
