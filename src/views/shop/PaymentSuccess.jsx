import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';



function PaymentSuccess() {
    const [loading, setIsLoading] = useState(true)
    const [orderResponse, setOrderResponse] = useState([])
    const [order, setOrder] = useState([])


    const axios = apiInstance
    const param = useParams()

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const payaplOrderId = urlParams.get('payapl_order_id');

    console.log(param);
    console.log(sessionId);
    console.log(payaplOrderId);

    // Get order details
    useEffect(() => {
        axios.get(`checkout/${param?.order_oid}/`).then((res) => {
            setOrder(res.data);
        })
    }, [param])


    // Payment Processing
    useEffect(() => {
        const formData = new FormData();
        formData.append('order_oid', param?.order_oid);
        formData.append('session_id', sessionId);
        formData.append('payapl_order_id', payaplOrderId);

        setIsLoading(true)

        axios.post(`payment-success/`, formData).then((res) => {
            setOrderResponse(res.data)
            if (res.data.message === "Payment Successfull") {
                setIsLoading(false)
            }

            if (res.data.message === "Already Paid") {
                setIsLoading(false)
            }

        })

    }, [param?.order_oid])



    console.log(orderResponse);
    return (
        <div>
            <>
                <main>
                    <main className="mb-4 mt-4 h-100">
                        <div className="container">
                            {/* Section: Checkout form */}
                            <section className="">
                                <div className="gx-lg-5">
                                    <div className="row pb50">
                                        <div className="col-lg-12">
                                            <div className="dashboard_title_area">
                                                {/* <p class="para">Lorem ipsum dolor sit amet, consectetur.</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="application_statics">
                                                <div className="account_user_deails dashboard_page">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div className="col-lg-12">
                                                            <div className="" />
                                                            {loading === true &&
                                                                <>
                                                                    <div className="border border-3 border-warning">

                                                                        <div className="card bg-white shadow p-5">
                                                                            <div className="mb-4 text-center">
                                                                                <i
                                                                                    className="fas fa-clock text-warning"
                                                                                    style={{ fontSize: 100, color: "green" }}
                                                                                />
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <h1>Verifying Payment</h1> <i className="fas fa-spinner fa-spin"></i>
                                                                                <p>
                                                                                    Please wait while we verify your payment.
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }

                                                            {orderResponse.message === "Already Paid" && loading == false &&
                                                                <>
                                                                    <div className="border border-3 border-success">
                                                                        <div className="card bg-white shadow p-5">
                                                                            <div className="mb-4 text-center">
                                                                                <i
                                                                                    className="fas fa-check-circle text-success"
                                                                                    style={{ fontSize: 100, color: "green" }}
                                                                                />
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <h1>Already Paid!</h1>
                                                                                <p>
                                                                                    You have already paid for this order, thank you.
                                                                                </p>
                                                                                <button
                                                                                    className="btn btn-success mt-3 me-2"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#exampleModal"
                                                                                >
                                                                                    View Order <i className="fas fa-eye" />{" "}
                                                                                </button>
                                                                                <Link to={`/invoice/${order.oid}/`} className="btn btn-success mt-3 me-2" >
                                                                                    Download Invoice{" "}
                                                                                    <i className="fas fa-file-invoice" />{" "}
                                                                                </Link>
                                                                                <Link
                                                                                    to="/"
                                                                                    className="btn btn-success mt-3 me-2"
                                                                                >
                                                                                    Homepage <i className="fas fa-fa-arrow-left" />{" "}
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }

                                                            {orderResponse.message === "Payment Successfull" && loading == false &&
                                                                <>
                                                                    <div className="border border-3 border-success">
                                                                        <div className="card bg-white shadow p-5">
                                                                            <div className="mb-4 text-center">
                                                                                <i
                                                                                    className="fas fa-check-circle text-success"
                                                                                    style={{ fontSize: 100, color: "green" }}
                                                                                />
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <h1>Thank You !</h1>
                                                                                <p>
                                                                                    Your checkout was successfull, we have sent the
                                                                                    order detail to your email{" "}
                                                                                </p>
                                                                                <button
                                                                                    className="btn btn-success mt-3 me-2"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#exampleModal"
                                                                                >
                                                                                    View Order <i className="fas fa-eye" />{" "}
                                                                                </button>
                                                                                <Link to={`/invoice/${order.oid}/`} className="btn btn-success mt-3 me-2" >
                                                                                    Download Invoice{" "}
                                                                                    <i className="fas fa-file-invoice" />{" "}
                                                                                </Link>
                                                                                <Link
                                                                                    to="/"
                                                                                    className="btn btn-success mt-3 me-2"
                                                                                >
                                                                                    Homepage <i className="fas fa-fa-arrow-left" />{" "}
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Order Summary
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="modal-body text-start text-black p-4">
                                        <h5
                                            className="modal-title text-uppercase "
                                            id="exampleModalLabel"
                                        >
                                            {order.full_name}
                                        </h5>
                                        <h6>{order.email}</h6>
                                        <h6 className="mb-5">{order.address}</h6>
                                        <p className="mb-0" style={{ color: "#35558a" }}>
                                            Payment summary
                                        </p>
                                        <hr
                                            className="mt-2 mb-4"
                                            style={{
                                                height: 0,
                                                backgroundColor: "transparent",
                                                opacity: ".75",
                                                borderTop: "2px dashed #9e9e9e"
                                            }}
                                        />
                                        <div className="d-flex justify-content-between">
                                            <p className="fw-bold mb-0">Subtotal</p>
                                            <p className="text-muted mb-0">${order.sub_total}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="small mb-0">Shipping Fee</p>
                                            <p className="small mb-0">${order.shipping_amount}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="small mb-0">Service Fee</p>
                                            <p className="small mb-0">${order.service_fee}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="small mb-0">Tax</p>
                                            <p className="small mb-0">${order.tax_fee}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="small mb-0">Discount</p>
                                            <p className="small mb-0">-${order.saved}</p>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <p className="fw-bold">Total</p>
                                            <p className="fw-bold" style={{ color: "#35558a" }}>
                                                ${order.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>

        </div>
    )
}

export default PaymentSuccess
