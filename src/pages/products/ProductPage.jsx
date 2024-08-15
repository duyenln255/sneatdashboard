import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import '../../styles/ProductPage.css';
import LoadingOverlay from '../../components/LoadingOverlay';
import DebounceFilter from '../../components/DebounceFilter';
import { fetchProducts, filterProductsByName } from '../../services/productService';
import ProductTable from '../../components/ProductTable';

const ProductPage = () => {
    const token = useSelector((state) => state.user.token);
    const [page, setPage] = useState(1);
    const [rowSize, setRowSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalProducts, setTotalProducts] = useState(0);

    const fetchProductData = useCallback(() => fetchProducts(page, rowSize, token), [page, rowSize, token]);
    const filterProductData = useCallback(() => filterProductsByName(searchTerm, page, rowSize, token), [searchTerm, page, rowSize, token]);

    useEffect(() => {
        if (searchTerm) {
            setPage(1);
            setTotalProducts(0);
        }
    }, [searchTerm]);

    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: searchTerm ? ['filteredProducts', searchTerm, page, rowSize] : ['products', page, rowSize],
        queryFn: searchTerm ? filterProductData : fetchProductData,
        keepPreviousData: true,
        staleTime: 900000, // 15 minutes
        cacheTime: 900000, // 15 minutes
        retry: 1,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setTotalProducts(data.totalItems);
        }
    });

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // if (isLoading) {
    //     return <div><LoadingOverlay /></div>;
    // }
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-page">
            {isLoading || isFetching ? <LoadingOverlay /> : null}
            <h1 className="title">Product List</h1>
            <div className="filter-container">
                <DebounceFilter onSearch={handleSearch} />
            </div>
            {isFetching && <LoadingOverlay />}
            <ProductTable
                data={data}
                page={page}
                rowSize={rowSize}
                totalProducts={totalProducts}
                setPage={setPage}
                setRowSize={setRowSize}
                setTotalProducts={setTotalProducts}
            />
        </div>
    );
};

export default ProductPage;
