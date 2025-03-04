import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

function OrderItemDetail() {
    const [orderItems, setOrderItems] = useState([])
    const [order, setOrder] = useState([])
    const [courier, setCourier] = useState([])
    const [trackingData, setTrackingData] = useState({})
    const [loading, setLoading] = useState(false)

    const handleTrackingDataChange = (event) => {
        setTrackingData({
            ...trackingData,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
        console.log(trackingData);
    }


    const axios = apiInstance
    const userData = UserData()
    const param = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`vendor/order-item-detail/${param.id}/`)
                setOrder(response.data.order);
                setOrderItems(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchCourier = async () => {
            try {
                const response = await axios.get(`vendor/couriers/`)
                setCourier(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCourier();
        fetchData();
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log(trackingData.tracking_id);
            console.log(trackingData.delivery_couriers);

            const formdata = new FormData()
            formdata.append("tracking_id", trackingData.tracking_id)
            formdata.append("delivery_couriers", trackingData.delivery_couriers)
            formdata.append("notify_buyer", trackingData.notify_buyer)

            await axios.patch(`vendor/order-item-detail/${param.id}/`, formdata).then((res) => {
                console.log(res.data);
                setLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Tracking ID Added"
                })
            })
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <main className="mb-5">
                                {/* Container for demo purpose */}
                                <div className="container px-4">
                                    {/* Section: Summary */}
                                    <section className="mb-5">
                                        <h3 className="mb-3">
                                            <i className="fas fa-shopping-cart text-primary" /> #{order.oid}
                                        </h3>
                                    </section>

                                    <section className="">
                                        <div className="row rounded shadow p-3">
                                            <div className="col-lg-12 mb-4 mb-lg-0">
                                                <form onSubmit={handleOnSubmit}>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                                            <i className='fas fa-truck'></i> Choose Delivery Courier
                                                        </label>
                                                        <select required onChange={handleTrackingDataChange} name="delivery_couriers" id="" className='form-select'>
                                                            <option>Select Delivery Courier</option>
                                                            {courier.map((c, index) => (
                                                                <option key={index} value={c.id}>{c.name}</option>
                                                            ))}
                                                        </select>
                                                        <div id="emailHelp" className="form-text">
                                                            <span className="" style={{ color: "gray" }}>
                                                                <a href="">Contact us</a> if you can't find a shipping couriers
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                                            <i className='fas fa-link'></i> Tracking ID
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleTrackingDataChange}
                                                            name="tracking_id"
                                                            placeholder={`${orderItems.tracking_id || 'Add Tracking ID'}`}
                                                            defaultValue={orderItems.tracking_id || ''}
                                                        />
                                                    </div>
                                                    <div className="mb-3 form-check">
                                                        <input onChange={handleTrackingDataChange} name='notify_buyer' type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                                            Notify Buyer
                                                        </label>
                                                    </div>
                                                    <Link to={`/vendor/orders/${order.oid}/`} className="btn btn-outline-secondary me-2"><i className='fas fa-arrow-left'></i> Go Back</Link>
                                                    {loading === true
                                                        ? <button type="submit" disabled className="btn btn-primary">Saving Tracking Data <i className='fas fa-spinner fa-spin'></i></button>
                                                        : <button type="submit" className="btn btn-primary">Save Tracking Info</button>
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItemDetail