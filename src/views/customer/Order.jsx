import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([])

    const axios = apiInstance
    const userData = UserData()
    

    useEffect(() => {
        axios.get(`customer/orders/${userData?.user_id}/`).then((res) => {
            setOrders(res.data)
        })
    }, [])

    console.log(orders);

    return (
        <div className="container mt-5">
            <section className="">
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-9 mt-1">
                        <main className="mb-5" style={{}}>
                            {/* Container for demo purpose */}
                            <div className="container px-4">
                                {/* Section: Summary */}
                                <section className="mb-5">
                                    <h3 className="mb-3">
                                        {" "}
                                        <i className="fas fa-shopping-cart text-primary" /> Orders{" "}
                                    </h3>
                                    <div className="row gx-xl-5">
                                        <div className="col-lg-4 mb-4 mb-lg-0">
                                            <div
                                                className="rounded shadow"
                                                style={{ backgroundColor: "#B2DFDB" }}
                                            >
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="">
                                                            <p className="mb-1">Orders</p>
                                                            <h2 className="mb-0">
                                                                {orders.length}
                                                                <span
                                                                    className=""
                                                                    style={{ fontSize: "0.875rem" }}
                                                                ></span>
                                                            </h2>
                                                        </div>
                                                        <div className="flex-grow-1 ms-5">
                                                            <div className="p-3 badge-primary rounded-4">
                                                                <i
                                                                    className="fas fa-shopping-cart fs-4"
                                                                    style={{ color: "#004D40" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-4 mb-lg-0">
                                            <div
                                                className="rounded shadow"
                                                style={{ backgroundColor: "#D1C4E9" }}
                                            >
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="">
                                                            <p className="mb-1">Pending Delivery</p>
                                                            <h2 className="mb-0">
                                                                6
                                                                <span
                                                                    className=""
                                                                    style={{ fontSize: "0.875rem" }}
                                                                ></span>
                                                            </h2>
                                                        </div>
                                                        <div className="flex-grow-1 ms-5">
                                                            <div className="p-3 badge-primary rounded-4">
                                                                <i
                                                                    className="fas fa-clock fs-4"
                                                                    style={{ color: "#6200EA" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-4 mb-lg-0">
                                            <div
                                                className="rounded shadow"
                                                style={{ backgroundColor: "#BBDEFB" }}
                                            >
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="">
                                                            <p className="mb-1">Fulfilled Orders</p>
                                                            <h2 className="mb-0">
                                                                2
                                                                <span
                                                                    className=""
                                                                    style={{ fontSize: "0.875rem" }}
                                                                ></span>
                                                            </h2>
                                                        </div>
                                                        <div className="flex-grow-1 ms-5">
                                                            <div className="p-3 badge-primary rounded-4">
                                                                <i
                                                                    className="fas fa-check-circle fs-4"
                                                                    style={{ color: "#01579B" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* Section: Summary */}
                                {/* Section: MSC */}
                                <section className="">
                                    <div className="row rounded shadow p-3">
                                        <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                                            <table className="table align-middle mb-0 bg-white">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Payment Status</th>
                                                        <th>Order Status</th>
                                                        <th>Total</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((o, index) => (
                                                        <tr>
                                                            <td>
                                                                <p className="fw-bold mb-1">#{o.oid}</p>
                                                                <p className="text-muted mb-0">{moment(o.date).format('MM/DD/YYYY')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">{o.payment_status.toUpperCase()}</p>
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">{o.order_status}</p>
                                                            </td>
                                                            <td>
                                                                <span className="fw-normal mb-1">${o.total}</span>
                                                            </td>
                                                            <td>
                                                                <Link className="btn btn-link btn-sm btn-rounded" to={`/customer/order/detail/${o.oid}/`}>
                                                                    View <i className="fas fa-eye" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        <canvas id="myChart" style={{ width: "100%" }} />
                                    </div>
                                </section>
                                {/* Section: MSC */}
                            </div>
                            {/* Container for demo purpose */}
                        </main>
                    </div>
                </div>
            </section>
            {/*Section: Wishlist*/}
        </div>

    )
}

export default Orders