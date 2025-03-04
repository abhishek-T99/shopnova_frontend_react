import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';

function VendorRegister() {

    if (UserData()?.vendor_id !== 0) {
        window.location.href = '/vendor/dashboard/'
    }

    const [vendor, setVendor] = useState({
        image: null,
        name: "",
        email: "",
        description: "",
        mobile: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setVendor({
            ...vendor,
            [event.target.name]: event.target.value
        })
        console.log(vendor);
    }

    const handleFileChange = (event) => {
        setVendor({
            ...vendor,
            [event.target.name]: event.target.files[0]
        })
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        setIsLoading(true)

        formdata.append('image', vendor.image)
        formdata.append('name', vendor.name)
        formdata.append('email', vendor.email)
        formdata.append('description', vendor.description)
        formdata.append('mobile', vendor.mobile)
        formdata.append('user_id', UserData()?.user_id)

        await apiInstance.post(`vendor-register/`, formdata, config).then((res) => {
            console.log(res.data.message);
            if (res.data.message == "Created vendor account") {
                Swal.fire({
                    icon: "success",
                    title: "Vendor Account Created Successfully",
                    text: "Login to continue to dashboard",
                })
                setIsLoading(false)
                navigate('/logout')
            }
        })
    }

    return (
        <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
            <div className="container">
                {/* Section: Login form */}
                <section className="">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-5 col-md-8">
                            <div className="card rounded-5">
                                <div className="card-body p-4">
                                    <h3 className="text-center">Register Vendor Account</h3>
                                    <br />

                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-login"
                                            role="tabpanel"
                                            aria-labelledby="tab-login"
                                        >
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="Shop Name">
                                                        Shop Avatar
                                                    </label>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        name='image'
                                                        placeholder="Shop Avatar"
                                                        required
                                                        className="form-control"

                                                    />
                                                </div>
                                                {/* Email input */}
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="Shop Name">
                                                        Shop Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={handleInputChange}
                                                        name='name'
                                                        placeholder="Shop Name"
                                                        required
                                                        className="form-control"

                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="loginName">
                                                        Shop Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        onChange={handleInputChange}
                                                        name='email'
                                                        placeholder="Shop Email Address"
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="loginName">
                                                        Shop Contact Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={handleInputChange}
                                                        name='mobile'
                                                        placeholder="Mobile Number"
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="loginName">
                                                        Shop Description
                                                    </label>
                                                    <textarea className='form-control' onChange={handleInputChange} name="description" id="" cols="30" rows="10"></textarea>
                                                </div>


                                                <button className='btn btn-primary w-100' type="submit" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <>
                                                            <span className="mr-2 ">Processing...</span>
                                                            <i className="fas fa-spinner fa-spin" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="mr-2 me-3">Create Shop</span>
                                                            <i className="fas fa-shop" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default VendorRegister