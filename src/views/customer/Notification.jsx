import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import moment from 'moment';


function Notifications() {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    const axios = apiInstance
    const userData = UserData()

    useEffect(() => {
        axios.get(`customer/notification/${userData?.user_id}/`).then((res) => {
            setNotifications(res.data);
            if (notifications) {
                setLoading(false)
            }
        })
    }, [])

    console.log(notifications);

    return (
        <div>
            <main className="mt-5" style={{ marginBottom: 200 }}>
                <div className="container">
                    <section className="">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-9 mt-1">
                                <section className="">
                                    <main className="mb-5" style={{}}>
                                        <div className="container px-4">
                                            {/* Section: Summary */}
                                            <section className="">
                                                <h3 className="mb-3">
                                                    {" "}
                                                    <i className="fas fa-bell" /> Notifications{" "}
                                                </h3>
                                                <div className="list-group">
                                                    {notifications.map((noti, index) => (
                                                        <a href="#" className="list-group-item list-group-item-action" aria-current="true" >
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">New Order!</h5>
                                                                <small>{moment(noti.date).format('MM-DD-YYYY')}</small>
                                                            </div>
                                                            <p className="mb-1">
                                                                Your order #{noti?.order?.oid} was successfull
                                                            </p>
                                                            <small className=''>Total: ${noti?.order?.total}</small> <br />
                                                            <small className=''>Shipping: ${noti?.order?.shipping_amount}</small> <br />
                                                            <small className=''>Tax: ${noti?.order?.tax_fee}</small> <br />
                                                            <small className=''>Service Fee: ${noti?.order?.service_fee}</small> <br />
                                                        </a>
                                                    ))}

                                                    {notifications.length < 1 &&
                                                        <h6>No notifications yet</h6>
                                                    }

                                                </div>
                                            </section>
                                            {/* Section: Summary */}
                                            {/* Section: MSC */}
                                            {/* Section: MSC */}
                                        </div>
                                        {/* Container for demo purpose */}
                                    </main>
                                </section>
                            </div>
                        </div>
                    </section>
                    {/*Section: Wishlist*/}
                </div>
            </main>

        </div>
    )
}

export default Notifications