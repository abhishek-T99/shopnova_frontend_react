import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2'


function Settings() {

  const [profileData, setProfileData] = useState({ 'full_name': '', 'mobile': '', 'email': '', 'about': '', 'country': '', 'city': '', 'state': '', 'address': '', 'p_image': '', });
  const [vendorData, setVendorData] = useState([]);
  const [vendorImage, setVendorImage] = useState("");
  const [profileImage, setprofileImage] = useState("");


  const axios = apiInstance
  const userData = UserData()

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const fetchProfileData = async () => {
    try {
      axios.get(`vendor-settings/${userData?.user_id}/`).then((res) => {
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
        setprofileImage(res.data.image)
      })
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchVendorData = async () => {
    try {
      axios.get(`vendor-shop-settings/${userData?.vendor_id}/`).then((res) => {
        setVendorData(res.data)
        setVendorImage(res.data.image)
        console.log("res.data.image:", res.data.image);
      })
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchVendorData();
  }, []);

  console.log(vendorData);


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


  const handleShopInputChange = (event) => {
    setVendorData({
      ...vendorData,
      [event.target.name]: event.target.value
    })
  };

  const handleShopFileChange = (event) => {
    setVendorData({
      ...vendorData,
      [event.target.name]: event.target.files[0]
    })
  }




  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)

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
      await apiInstance.patch(`vendor-settings/${userData?.user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      fetchProfileData()
      Swal.fire({
        icon: 'success',
        title: "Profile updated successfully",
      })
      setLoading(false)

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  const handleShopFormSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.get(`vendor-shop-settings/${userData?.vendor_id}/`);

    const formData = new FormData();
    if (vendorData.image && vendorData.image !== res.data.image) {
      formData.append('image', vendorData.image);
    }
    formData.append('name', vendorData.name);
    formData.append('description', vendorData.description);
    formData.append('mobile', vendorData.mobile);


    try {
      await apiInstance.patch(`vendor-shop-settings/${userData?.vendor_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      Swal.fire({
        icon: 'success',
        title: "Shop updated successfully",
      })
      // setLoading(false)
      await fetchVendorData()

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main mt-4">
          <div className="container">
            <div className="main-body">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-shop-tab" data-bs-toggle="pill" data-bs-target="#pills-shop" type="button" role="tab" aria-controls="pills-shop" aria-selected="false">
                    Shop Settings
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >
                    Profile
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-shop" role="tabpanel" aria-labelledby="pills-shop-tab" >
                  <div className="row gutters-sm shadow p-4 rounded">
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            <img
                              src={vendorImage}
                              style={{ width: 160, height: 160, objectFit: "cover" }}
                              alt={profileData.full_name + ' Image'}
                              className="rounded-circle"
                              width={150}
                            />



                            <div className="mt-3">
                              <h4 className="text-dark">{vendorData.name}</h4>
                              <p className="text-secondary mb-1">{vendorData.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card mb-3">
                        <div className="card-body">
                          <form className="form-group" noValidate="" onSubmit={handleShopFormSubmit} method='POST' encType="multipart/form-data">
                            <div className="row text-dark">
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Shop Avatar
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  onChange={handleShopFileChange}
                                  name='image'
                                />
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Shop Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  value={vendorData?.name}
                                  onChange={handleShopInputChange}
                                  name='name'

                                />
                              </div>

                              <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Shop Description
                                </label>
                                <input
                                  name='description'
                                  value={vendorData?.description}
                                  type="text"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  onChange={handleShopInputChange}

                                />
                              </div>
                              <div className="row">

                                <div className="col-lg-12 mt-3">
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
                                    value={vendorData?.mobile}
                                    name='mobile'
                                    onChange={handleShopInputChange}

                                  />
                                </div>


                              </div>
                              <div className="col-lg-12 mt-4 mb-3 d-flex">
                                <button className="btn btn-success" type="submit">
                                  Update Shop <i className="fas fa-check-circle" />{" "}
                                </button>
                                <Link to={`/vendor/${vendorData.slug}/`} className="btn btn-primary ms-2" type="submit">
                                  View Shop <i className="fas fa-shop" />{" "}
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" >
                  <div className="row gutters-sm shadow p-4 rounded">
                    <div className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            {profileData.p_image &&
                              <img
                                src={profileImage}
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt={profileData.full_name + ' Image'}
                                className="rounded-circle"
                                width={150}
                              />
                            }

                            {!profileData.p_image &&
                              <img
                                src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt={profileData.full_name + ' Image'}
                                className="rounded-circle"
                                width={150}
                              />
                            }

                            <div className="mt-3">
                              <h4 className="text-dark">{profileData.full_name}</h4>
                              <p className="text-secondary mb-1">{profileData.about}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card mb-3">
                        <div className="card-body">
                          <form className="form-group" noValidate="" onSubmit={handleFormSubmit} method='POST' encType="multipart/form-data">
                            <div className="row text-dark">
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
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
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
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
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Email
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
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Phone Number
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
                              <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                  About Me
                                </label>
                                <input
                                  name='about'
                                  value={profileData?.about}
                                  type="text"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  onChange={handleInputChange}

                                />
                              </div>
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
                              <div className="col-lg-6 mt-4 mb-3">
                                <button className="btn btn-success" type="submit">
                                  Update Profile <i className="fas fa-check-circle" />{" "}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Send Email</div>
                        Receive Order, Updates, Offers Email
                      </div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                      />
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">MFA</div>
                        Enable Multi-Factor Authentication
                      </div>
                      <a href="" className="btn btn-primary">
                        Enable
                      </a>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Unsubscribe</div>
                        Unsubscribe from newsletter
                      </div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name=""
                        id=""
                      />
                    </li>
                  </ol>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <form className="form-group shadow p-4 rounded">
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Old Password
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                      <div id="emailHelp" className="form-text">
                        Enter your old password
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword2" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Password <i className="fas fa-check-circle" />{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Settings