import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../models/product';
import Paginotor from '../../components/Paginator';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>(`products`);
                setProducts(data.data);
                setLastPage(data.meta.last_page);
                setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
            }
        )();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await axios.delete(`products/${id}`);
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    return (
        <Wrapper>

            <Link to={'/products/create'} className="btn btn-outline-primary btn-sm mt-4">Create</Link>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th style={{ width: '10%' }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.length > 0 ? (
                                products.map((p: Product) => {
                                    return (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td><img src={p.image} alt={p.title} width="50" /></td>
                                            <td>{p.title}</td>
                                            <td>{p.description}</td>
                                            <td>{p.price}</td>
                                            <td>
                                                <Link to={`/products/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => del(p.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        No data
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <Paginotor page={page} lastPage={lastPage} pageChaned={setPage} pageNumbers={pageNumbers} />

        </Wrapper>
    );
};

export default Products;