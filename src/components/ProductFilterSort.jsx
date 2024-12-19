import React from 'react';

const ProductFilterSort = ({ setFilter, setSort }) => {
    return (
        <div className="flex justify-between mb-4">
            <div>
                <label>Filter by Category: </label>
                <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
                    <option value="">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>
            <div>
                <label>Sort by Price: </label>
                <select onChange={(e) => setSort(e.target.value)} className="border p-2">
                    <option value="desc">Low to High</option>
                    <option value="asc">High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilterSort;
