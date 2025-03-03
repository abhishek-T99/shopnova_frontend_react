import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import UseProfileData from '../plugin/UseProfileData'


function Sidebar() {

    const userProfile = UseProfileData()
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userProfile) {
            setLoading(false)
        }

    })

    return (
        <div className="col-lg-3">
            {loading === false &&
                <>
                    <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
                        <img
                            src={userProfile?.image}
                            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                            alt=""
                        />
                        <div className="text-center">
                            <h3 className="mb-0">{userProfile?.full_name}</h3>
                            <p className="mt-0">
                                <Link to="/customer/settings/"><i className='fas fa-edit me-2'></i> Edit Account</Link>
                            </p>
                        </div>
                    </div>
                    <ol className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/account/'} className="fw-bold text-dark"> <i className='fas fa-user me-2'></i> Account</Link>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/orders/'} className="fw-bold text-dark"><i className='fas fa-shopping-cart me-2'></i>Orders</Link>
                            </div>
                            <span className="badge bg-primary rounded-pill">14</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/wishlist/'} className="fw-bold text-dark"><i className='fas fa-heart fa-fade me-2'></i> Wishlist</Link>
                            </div>
                            <span className="badge bg-primary rounded-pill">14</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/notifications/'} className="fw-bold text-dark"><i className='fas fa-bell fa-shake me-2'></i> Notification</Link>
                            </div>
                            <span className="badge bg-primary rounded-pill">14</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/settings/'} className="fw-bold text-dark"><i className='fas fa-gear fa-spin me-2'></i> Setting</Link>
                            </div>
                        </li>
                        {/* <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/customer/notifications/'} className="fw-bold text-dark"><i className='fas fa-truck me-2'></i> Track Order</Link>
                            </div>
                        </li> */}
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to="/logout" className="fw-bold text-danger"><i className='fas fa-sign-out me-2'></i> Logout</Link>
                            </div>
                        </li>
                    </ol>
                </>
            }
        </div>
    )
}

export default Sidebar