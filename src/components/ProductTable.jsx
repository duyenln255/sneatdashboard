import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductTable = ({ data, page, rowSize, totalProducts, setPage, setRowSize, setTotalProducts }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const columns = useMemo(    // Định nghĩa các cột của bảng
        () => [
            {
                Header: '',
                id: 'expander',
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </span>
                ),
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name of product type',
                accessor: 'name',
            },
            {
                Header: 'GTIN Code',
                accessor: 'gtin',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span className={`status-label ${value === 'active' ? 'in-production' : 'stop-producing'}`}>
                        {value === 'active' ? 'IN PRODUCTION' : 'STOP PRODUCING'}
                    </span>
                ),
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="action-buttons">
                        <button className="icon-button edit-button" onClick={() => editProduct(row.original.id)}>
                            <EditIcon />
                        </button>
                        {row.original.status === 'inactive' ? (
                            <button className="icon-button activate-button" onClick={() => activateProduct(row.original.id)}>
                                <CheckOutlinedIcon />
                            </button>
                        ) : (
                            <button className="icon-button delete-button" onClick={() => deleteProduct(row.original.id)}>
                                <ClearOutlinedIcon />
                            </button>
                        )}
                    </div>
                ),
            },
        ],
        []
    );
    // Chuyển đổi dữ liệu từ API thành dữ liệu cho bảng
    const dataForTable = useMemo(
        () =>
            data && data.data
                ? data.data.map((product, index) => ({
                    id: index + 1 + (page - 1) * rowSize,
                    name: product.name,
                    gtin: product.gtin || '---',
                    status: product.status ? 'active' : 'inactive',
                    actions: '',
                    details: JSON.stringify(product, null, 2),// Chi tiết sản phẩm dạng JSON
                }))
                : [],
        [data, page, rowSize]
    );

    const totalPages = data ? data.totalPage : 1;  // Tổng số trang

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page: tablePage,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize: updatePageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: dataForTable,
            initialState: { pageIndex: page - 1, pageSize: rowSize },
            manualPagination: true,
            pageCount: totalPages,
        },
        useExpanded,
        usePagination
    );

    const editProduct = (id) => {
        console.log(`Edit product with ID: ${id}`);
    };

    const deleteProduct = (id) => {
        console.log(`Delete product with ID: ${id}`);
    };

    const activateProduct = (id) => {
        console.log(`Activate product with ID: ${id}`);
    };

    useEffect(() => {
        if (data && data.data && data.data.length === 0 && page > 1) {
            setPage((prevPage) => prevPage - 1); // Giảm trang nếu không có dữ liệu trả về
        }
    }, [data, page, setPage]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = 5;

        const handleEllipsisClick = () => {
            setExpandedRow(!expandedRow);
        };

        if (totalPages <= totalPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button key={i} onClick={() => setPage(i)} disabled={page === i} className={`pagination-button ${page === i ? 'active' : ''}`}>
                        {i}
                    </button>
                );
            }
        } else {
            if (expandedRow) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(
                        <button key={i} onClick={() => { setPage(i); setExpandedRow(false); }} disabled={page === i} className={`pagination-button ${page === i ? 'active' : ''}`}>
                            {i}
                        </button>
                    );
                }
            } else {
                if (page <= 3) {
                    for (let i = 1; i <= 3; i++) {
                        pageNumbers.push(
                            <button key={i} onClick={() => setPage(i)} disabled={page === i} className={`pagination-button ${page === i ? 'active' : ''}`}>
                                {i}
                            </button>
                        );
                    }
                    pageNumbers.push(<button key="right-ellipsis" onClick={handleEllipsisClick} className="pagination-button pagination-ellipsis">...</button>);
                    pageNumbers.push(
                        <button key={totalPages} onClick={() => setPage(totalPages)} disabled={page === totalPages} className={`pagination-button ${page === totalPages ? 'active' : ''}`}>
                            {totalPages}
                        </button>
                    );
                } else if (page >= totalPages - 2) {
                    pageNumbers.push(
                        <button key={1} onClick={() => setPage(1)} disabled={page === 1} className={`pagination-button ${page === 1 ? 'active' : ''}`}>
                            1
                        </button>
                    );
                    pageNumbers.push(<button key="left-ellipsis" onClick={handleEllipsisClick} className="pagination-button pagination-ellipsis">...</button>);
                    for (let i = totalPages - 2; i <= totalPages; i++) {
                        pageNumbers.push(
                            <button key={i} onClick={() => setPage(i)} disabled={page === i} className={`pagination-button ${page === i ? 'active' : ''}`}>
                                {i}
                            </button>
                        );
                    }
                } else {
                    pageNumbers.push(
                        <button key={1} onClick={() => setPage(1)} disabled={page === 1} className={`pagination-button ${page === 1 ? 'active' : ''}`}>
                            1
                        </button>
                    );
                    pageNumbers.push(<button key="left-ellipsis" onClick={handleEllipsisClick} className="pagination-button pagination-ellipsis">...</button>);
                    for (let i = page - 1; i <= page + 1; i++) {
                        pageNumbers.push(
                            <button key={i} onClick={() => setPage(i)} disabled={page === i} className={`pagination-button ${page === i ? 'active' : ''}`}>
                                {i}
                            </button>
                        );
                    }
                    pageNumbers.push(<button key="right-ellipsis" onClick={handleEllipsisClick} className="pagination-button pagination-ellipsis">...</button>);
                    pageNumbers.push(
                        <button key={totalPages} onClick={() => setPage(totalPages)} disabled={page === totalPages} className={`pagination-button ${page === totalPages ? 'active' : ''}`}>
                            {totalPages}
                        </button>
                    );
                }
            }
        }
        return pageNumbers;
    };

    const renderExpandedContent = (row) => {
        const productDetails = JSON.parse(row.original.details); // Chuyển đổi chi tiết sản phẩm từ JSON
        const keysToShow = ['_id', 'name', 'status', 'createdAt'];  // Chỉ ra các khóa cần hiển thị
        const displayedDetails = keysToShow.reduce((acc, key) => {
            if (productDetails[key]) {
                acc[key] = productDetails[key];
            }
            return acc;
        }, {});

        return (
            <div className="expanded-cell-content">
                <pre>{JSON.stringify(displayedDetails, null, 2)}</pre>
            </div>
        );
    };

    return (  
        <div className="table-container">
            <table {...getTableProps()} className="product-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {tablePage.map((row) => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={row.id}>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                                {row.isExpanded && (
                                    <tr>
                                        <td colSpan={columns.length}>
                                            {renderExpandedContent(row)}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination-container">
                <div className="pagination">
                    <button onClick={() => { previousPage(); setPage(page - 1); }} disabled={!canPreviousPage} className="pagination-button">
                        {'<'}
                    </button>
                    {renderPageNumbers()}
                    <button onClick={() => { nextPage(); setPage(page + 1); }} disabled={!canNextPage} className="pagination-button">
                        {'>'}
                    </button>
                </div>
                <div className="page-size-selector">
                    <label htmlFor="page-size">Show: </label>
                    <select
                        id="page-size"
                        value={pageSize}
                        onChange={(e) => {
                            updatePageSize(Number(e.target.value));
                            setRowSize(Number(e.target.value));
                            setPage(1);  // Reset to page 1 on page size change
                            setTotalProducts(0); // Reset total products on page size change
                        }}
                        className="page-size-select"
                    >
                        {[5, 10, 20, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="page-size"> rows</label>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
