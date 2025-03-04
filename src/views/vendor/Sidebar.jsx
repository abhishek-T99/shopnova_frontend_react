import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserData from '../plugin/UserData';


function Sidebar() {
    const currentPathname = window.location.pathname;
    const location = useLocation();
    const isActiveLink = (currentPath, linkPath) => {
        return currentPath.includes(linkPath);
    };


    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }

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
                {/* <li className="mb-3">
                    <a href="faqs.html" className={isActiveLink(location.pathname, '/vendor/faqs/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-patch-question" /> FAQs{" "}
                    </a>
                </li> */}
                <li className="mb-3">
                    <Link to={`/vendor/coupon/`} className={isActiveLink(location.pathname, '/vendor/coupon/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-tag" /> Coupon &amp; Discount{" "}
                    </Link>
                </li>
                {/* <li className="mb-3">
                    <a href="customers.html" className={isActiveLink(location.pathname, '/vendor/customers/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-people" /> Customers{" "}
                    </a>
                </li> */}
                <li className="mb-3">
                    <Link to={`/vendor/notifications/`} className={isActiveLink(location.pathname, '/vendor/notifications/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-bell" /> Notifications{" "}
                    </Link>
                </li>
                {/* <li className="mb-3">
                    <a href="message.html" className={isActiveLink(location.pathname, '/vendor/message/') ? "nav-link text-white active" : "nav-link text-white"}>
                        {" "}
                        <i className="bi bi-envelope" /> Message{" "}
                    </a>
                </li> */}
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