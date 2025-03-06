import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import { addToWishlist } from '../plugin/addToWishlist';
import Addon from '../plugin/Addon';
import Swal from 'sweetalert2';

function Wishlist() {
    const [wishlist, setWishlist] = useState([])

    const axios = apiInstance
    const userData = UserData()

    const addon = Addon()


    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`customer/wishlist/${userData?.user_id}/`);
            setWishlist(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [userData?.user_id]);

    console.log(wishlist);

    const handleAddToWishlist = async (product_id) => {
        if (!userData?.user_id) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to add items to your wishlist.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
    
        try {
            await addToWishlist(product_id, userData.user_id);
            fetchWishlist();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the item to your wishlist.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
            });
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
                                        <div className="container">
                                            {/* Section: Summary */}
                                            <section className="">
                                                <div className="row">
                                                    <h3 className="mb-3">
                                                        {" "}
                                                        <i className="fas fa-heart text-danger" /> Wishlist{" "}
                                                    </h3>
                                                    {wishlist.map((w, index) => (
                                                        <div className="col-lg-4 col-md-12 mb-4">
                                                            <div className="card">
                                                                <div
                                                                    className="bg-image hover-zoom ripple"
                                                                    data-mdb-ripple-color="light"
                                                                >
                                                                    <Link to={`/detail/${w.product.slug}`}>   
                                                                    <img
                                                                        src={w.product.image}
                                                                        className="w-100"
                                                                        style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                                                    />
                                                                    </Link>
                                                                    <a href="#!">
                                                                        <div className="mask">
                                                                            <div className="d-flex justify-content-start align-items-end h-100">
                                                                                <h5>
                                                                                    <span className="badge badge-primary ms-2">
                                                                                        New
                                                                                    </span>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="hover-overlay">
                                                                            <div
                                                                                className="mask"
                                                                                style={{
                                                                                    backgroundColor: "rgba(251, 251, 251, 0.15)"
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div className="card-body">
                                                                    <Link to={`/detail/${w.product.slug}`} className="text-reset"><h5 className="card-title mb-3 ">{w.product.title.slice(0, 50)}...</h5></Link>
                                                                    <a href="" className="text-reset">
                                                                        <p>{w.product?.brand.title}</p>
                                                                    </a>
                                                                    <h6 className="mb-3">{addon.currency_sign} {w.product.price}</h6>

                                                                    <button onClick={() => handleAddToWishlist(w.product.id)} type="button" className="btn btn-danger px-3 me-1 mb-1">
                                                                        <i className="fas fa-heart" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {wishlist.length < 1 &&
                                                        <h6 className='container'>Your wishlist is Empty </h6>
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

export default Wishlist