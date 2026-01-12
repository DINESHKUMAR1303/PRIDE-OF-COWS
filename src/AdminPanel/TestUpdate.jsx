import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestUpdate = () => {
    const navigate = useNavigate();

    const testProduct = {
        _id: "test123",
        productName: "Test Product",
        weight: "1L",
        price: 100,
        mrp: 120,
        image: "/uploads/products/test.jpg"
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Update Product Test Page</h1>
            <button
                onClick={() => {
                    console.log('Navigating to edit with product:', testProduct);
                    navigate('/admin/products/add', {
                        state: { editProduct: testProduct }
                    });
                }}
                style={{
                    padding: '10px 20px',
                    background: '#16c784',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Test Edit Navigation
            </button>
        </div>
    );
};

export default TestUpdate;
