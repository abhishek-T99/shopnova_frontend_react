import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserData from '../plugin/UserData';
import apiInstance from '../../utils/axios';


function Sidebar() {
    const [vendorData, setVendorData] = useState([])

    const currentPathname = window.location.pathname;
    const location = useLocation();
    const isActiveLink = (currentPath, linkPath) => {
        return currentPath.includes(linkPath);
    };

    const axios = apiInstance

    const userData = UserData()

    if (userData.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }

    const fetchVendorData = async () => {
        try {
          axios.get(`vendor-shop-settings/${userData?.vendor_id}/`).then((res) => {
            setVendorData(res.data)
          })
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchVendorData();
      }, []);

    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark navbar-dark" id="sidebar" role="navigation" >
            <ul className="nav nav-pills flex-column mb-auto nav flex-column pl-1 pt-2">
                <li className="mb-3">
                    <Link to="/vendor/dashboard/" className={isActiveLink(location.pathname, '/vendor/dashboard/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-speedometer" /> Dashboard{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/products/" className={isActiveLink(location.pathname, '/vendor/products/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-grid" /> Products{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/orders/" className={isActiveLink(location.pathname, '/vendor/orders/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-cart-check" /> Orders{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/earning/" className={isActiveLink(location.pathname, '/vendor/earning/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-currency-dollar" /> Earning{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/reviews/" className={isActiveLink(location.pathname, '/vendor/reviews/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-star" /> Reviews{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/product/new/" className={isActiveLink(location.pathname, '/vendor/product/new/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-plus-circle" /> Add Product{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to={`/vendor/coupon/`} className={isActiveLink(location.pathname, '/vendor/coupon/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-tag" /> Coupon &amp; Discount{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to={`/vendor/notifications/`} className={isActiveLink(location.pathname, '/vendor/notifications/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-bell" /> Notifications{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to={`/vendor/${vendorData.slug}/`} className={"nav-link text-white"}>
                        {" "}
                        <i className="fas fa-shop" /> View Shop{" "}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/vendor/settings/" className={isActiveLink(location.pathname, '/vendor/settings/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-gear-fill" /> Settings{" "}
                    </Link>
                </li>

                <li className="mb-3">
                    <Link to="/logout" className={isActiveLink(location.pathname, '/logout') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-box-arrow-left" /> Logout{" "}
                    </Link>
                </li>

            </ul>
            <hr />
        </div >
    )
}

export default Sidebar