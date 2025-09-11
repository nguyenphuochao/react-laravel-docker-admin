import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import { Order } from '../../models/order';
import axios from 'axios';
import { OrderItem } from '../../models/order_item';

const hide = {
    maxHeight: 0,
    transition: '1000ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '1000ms ease-out'
}

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>(`orders`);
                setOrders(data.data);
            }
        )();
    }, []);

    const select = (id: number) => {
        setSelected(selected !== id ? id : 0)
    }

    const handleExport = async () => {
        const { data } = await axios.post<any>('export', {}, { responseType: 'blob' });
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>

            <button className="btn btn-sm btn-outline-primary mt-3 mb-3" onClick={() => handleExport()}>Export CSV</button>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((o: Order) => {
                                    return (
                                        <>
                                            <tr key={o.id}>
                                                <td>{o.id}</td>
                                                <td>{o.name}</td>
                                                <td>{o.email}</td>
                                                <td>{o.total}</td>
                                                <td><button className="btn btn-sm btn-outline-primary"
                                                    onClick={() => select(o.id)}>View</button></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="overflow-hidden" style={selected === o.id ? show : hide}>
                                                        <table className="table table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Product title</th>
                                                                    <th>Quantity</th>
                                                                    <th>Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    o.order_items.map((i: OrderItem) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{i.id}</td>
                                                                                <td>{i.product_title}</td>
                                                                                <td>{i.quantity}</td>
                                                                                <td>{i.price}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
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

        </Wrapper>
    );
};

export default Orders;