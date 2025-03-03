import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import UseProfileData from '../plugin/UseProfileData';
import Swal from 'sweetalert2'


function Settings() {
    const [profileData, setProfileData] = useState({
        'full_name': '',
        'mobile': '',
        'email': '',
        'about': '',
        'country': '',
        'city': '',
        'state': '',
        'address': '',
        'p_image': '',
    });
    const [loading, setLoading] = useState(false)
    

    const axios = apiInstance
    const userData = UserData()

    useEffect(() => {
        // Fetch existing profile data
        const fetchProfileData = async () => {
            try {
                axios.get(`user/profile/${userData?.user_id}/`).then((res) => {
                    // setProfileData(res.data);
                    setProfileData({
                        'full_name': res.data?.full_name,
                        'email': res.data.user.email,
                        'phone': res.data.user.phone,
                        'about': res.data.about,
                        'country': res.data.country,
                        'city': res.data.city,
                        'state': res.data.state,
                        'address': res.data.address,
                        'p_image': res.data.image,
                    })
                })
            } catch (error) {
                console.error('Error fetching profile data: ', error);
            }
        };

        fetchProfileData();
    }, []);


    const handleInputChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    };

    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.files[0]
        })
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await axios.get(`user/profile/${userData?.user_id}/`);

        const formData = new FormData();
        if (profileData.p_image && profileData.p_image !== res.data.image) {
            formData.append('image', profileData.p_image);
        }
        formData.append('full_name', profileData.full_name);
        formData.append('about', profileData.about);
        formData.append('country', profileData.country);
        formData.append('city', profileData.city);
        formData.append('state', profileData.state);
        formData.append('address', profileData.address);

        try {
            await apiInstance.patch(`customer/setting/${userData?.user_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            Swal.fire({
                icon: 'success',
                title: "Profile updated successfully",
            })
            setLoading(false)

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <main className="mt-5">
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
                                                    <i className="fas fa-gear fa-spin" /> Settings{" "}
                                                </h3>
                                                <form onSubmit={handleFormSubmit} method='POST' encType="multipart/form-data">
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-4">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Profile Image
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                onChange={handleFileChange}
                                                                name='p_image'
                                                            />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Full Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.full_name}
                                                                onChange={handleInputChange}
                                                                name='full_name'

                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Email address
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.email}
                                                                name='email'
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Mobile
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.phone}
                                                                name='phone'
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Address
                                                            </label>
                                                            <input
                                                                name='address'
                                                                value={profileData?.address}
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                onChange={handleInputChange}

                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.city}
                                                                name='city'
                                                                onChange={handleInputChange}

                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.state}
                                                                name='state'
                                                                onChange={handleInputChange}

                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mt-3">
                                                            <label
                                                                htmlFor="exampleInputEmail1"
                                                                className="form-label"
                                                            >
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                aria-describedby="emailHelp"
                                                                value={profileData?.country}
                                                                name='country'
                                                                onChange={handleInputChange}

                                                            />
                                                        </div>
                                                    </div>
                                                    {loading === false &&
                                                        <button type="submit" className="btn btn-primary mt-5">
                                                            Save Changes
                                                        </button>
                                                    }

                                                    {loading === true &&
                                                        <button disabled className="btn btn-primary mt-5">
                                                            Saving... <i className='fas fa-spinner fa-spin'></i>
                                                        </button>
                                                    }
                                                </form>
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

export default Settings