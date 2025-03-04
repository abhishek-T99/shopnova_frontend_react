import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

function CouponEdit() {
    const [coupon, setCoupon] = useState({
        code: '',
        discount: '',
        active: false
    });

    const axios = apiInstance;
    const userData = UserData();
    const param = useParams();
    const navigate = useNavigate();  // Hook to navigate programmatically

    if (userData?.vendor_id === 0) {
        window.location.href = '/vendor/register/';
    }

    const fetchData = async () => {
        try {
            const res = await axios.get(`vendor-coupon-detail/${userData?.vendor_id}/${param.id}/`);
            setCoupon(res.data);  // Set the coupon state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [param.id]); // Make sure to refetch when the coupon ID changes

    const handleUpdateCouponChange = (event) => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        });
    };

    const handleUpdateCoupon = async (e) => {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append("vendor", userData?.vendor_id);
        formdata.append("code", coupon.code);
        formdata.append("discount", coupon.discount);
        formdata.append("active", coupon.active);

        try {
            await axios.patch(`vendor-coupon-detail/${userData?.vendor_id}/${param.id}/`, formdata);
            Swal.fire({
                icon: 'success',
                title: 'Coupon Updated',
            });

            // Navigate back to the coupon list page after successful update
            navigate("/vendor/coupon/");
        } catch (error) {
            console.error('Error updating coupon:', error);
        }
    };

    // Ensure the coupon data is loaded before rendering the form
    if (!coupon.code) {
        return <div>Loading...</div>;  // Show a loading message or spinner while the data is being fetched
    }

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <h4 className="mt-3 mb-4"><i className="bi bi-tag" /> Coupons</h4>
                    <form onSubmit={handleUpdateCoupon} className="card shadow p-3">
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Code</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="code"
                                name="code"
                                placeholder="Enter Coupon Code"
                                onChange={handleUpdateCouponChange}
                                value={coupon.code || ''}
                            />
                            <div id="emailHelp" className="form-text">E.g VENDORSHOP2024</div>
                        </div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="discount" className="form-label">Discount</label>
                            <input
                                type="number"
                                required
                                className="form-control"
                                id="discount"
                                name="discount"
                                placeholder="Enter Discount"
                                onChange={handleUpdateCouponChange}
                                value={coupon.discount || ''}
                            />
                            <div id="emailHelp" className="form-text">
                                NOTE: Discount is in <b>percentage</b>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                checked={coupon.active}
                                onChange={handleUpdateCouponChange}
                                name="active"
                                className="form-check-input"
                                id="activeCheck"
                            />
                            <label className="form-check-label" htmlFor="activeCheck">
                                Activate Coupon
                            </label>
                        </div>
                        <div className="d-flex">
                            <Link to="/vendor/coupon/" className="btn btn-secondary">
                                <i className="fas fa-arrow-left"></i> Go Back
                            </Link>
                            <button type="submit" className="btn btn-success ms-2">
                                Update Coupon <i className="fas fa-check-circle"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CouponEdit;
