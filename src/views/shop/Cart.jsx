import { React, useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

// Icons
import { FaCheckCircle } from 'react-icons/fa';
import Addon from '../plugin/Addon';
import { addToCart } from '../plugin/addToCart';
import apiInstance from '../../utils/axios';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import UseProfileData from '../plugin/UseProfileData';
import CartID from '../plugin/cartID';
import { CartContext } from '../plugin/Context';

function Cart() {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState([])
    const [productQuantities, setProductQuantities] = useState({});
    let [isAddingToCart, setIsAddingToCart] = useState('')

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [cartCount, setCartCount] = useContext(CartContext);

    const addon = Addon()

    const axios = apiInstance
    const userData = UserData()
    const userProfileData = UseProfileData()

    let cart_id = CartID()
    const currentAddress = GetCurrentAddress()
    let navigate = useNavigate();

    // Get cart Items
    const fetchCartData = (cartId, userId) => {
        const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`;

        axios.get(url).then((res) => {
            setCart(res.data);
        });
    };

    // Get Cart Totals
    const fetchCartTotal = async (cartId, userId) => {
        console.log(cartId, userId);
        const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`
        axios.get(url).then((res) => {
            setCartTotal(res.data);
        });
    }

    useEffect(() => {
        if (userData) {
            setFullName(userProfileData.full_name || "");
            setEmail(userData.email || "");
            setAddress(userProfileData.address || "");
            setCity(userProfileData.city || "");
            setState(userProfileData.state || "");
            setCountry(userProfileData.country || "");
        }
    }, [userData]);

    useEffect(() => {
            // Fetch existing profile data
            const fetchProfileData = async () => {
                try {
                    axios.get(`user/profile/${userData?.user_id}/`).then((res) => {
                        setMobile(res.data?.user.phone)
                    })
                } catch (error) {
                    console.error('Error fetching profile data: ', error);
                }
            };

            fetchProfileData();
        }, []);

    useEffect(() => {
        console.log(cartTotal);
    }, [cartTotal]);

    if (cart_id !== null || cart_id !== undefined) {
        if (userData !== undefined) {
            useEffect(() => {
                fetchCartData(cart_id, userData.user_id);
                fetchCartTotal(cart_id, userData.user_id);
            }, []);
        } else {
            useEffect(() => {
                fetchCartData(cart_id, null);
                fetchCartTotal(cart_id, null);
            }, []);
        }
    } else {
        window.location.href("/");
    }

    useEffect(() => {
        const initialQuantities = {};
        cart.forEach((c) => {
            initialQuantities[c.product.id] = c.qty;
        });
        setProductQuantities(initialQuantities);
    }, [cart]);  // Dependency array should be [cart], not productQuantities
    
    const handleQtyChange = (event, product_id) => {
        const quantity = event.target.value;
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [product_id]: quantity,
        }));
    };
    


    const UpdateCart = async (cart_id, item_id, product_id, price, shipping_amount, color, size) => {
        const qtyValue = productQuantities[product_id];

        // console.log("cart_id:", cart_id);
        // console.log("item_id:", item_id);
        // console.log("qtyValue:", qtyValue);
        // console.log("product_id:", product_id);

        try {
            // Await the addToCart function
            await addToCart(product_id, userData?.user_id, qtyValue, price, shipping_amount, currentAddress.country, color, size, cart_id, isAddingToCart);

            // Fetch the latest cart data after addToCart is completed
            fetchCartData(cart_id, userData?.user_id)
            fetchCartTotal(cart_id, userData?.user_id)

        } catch (error) {
            // Handle error, e.g., display an error message
            console.log(error);
        }
    };

    // Remove Item From Cart
    const handleDeleteClick = async (cartId, itemId) => {
        const url = userData?.user_id
            ? `cart-delete/${cartId}/${itemId}/${userData.user_id}/`
            : `cart-delete/${cartId}/${itemId}/`;

        try {
            await axios.delete(url);
            // Add any additional logic or state updates after successful deletion
            fetchCartData(cart_id, userData?.user_id)
            fetchCartTotal(cart_id, userData?.user_id)

            const cart_url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
            const response = await axios.get(cart_url);

            setCartCount(response.data.length);

        } catch (error) {
            console.error('Error deleting item:', error);
            // Handle errors or update state accordingly
        }
    };



    // Shipping Details
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Use computed property names to dynamically set the state based on input name
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'mobile':
                setMobile(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break;
        }
    };



    const createCartOrder = async () => {

        if (!fullName || !email || !mobile || !address || !city || !state || !country) {
            // If any required field is missing, show an error message or take appropriate action
            console.log("Please fill in all required fields");
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields!',
                text: "All fields are required before checkout",
            })
            return;
        }

        try {

            const formData = new FormData();
            formData.append('full_name', fullName);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('country', country);
            formData.append('cart_id', cart_id);
            formData.append('user_id', userData ? userData.user_id : 0);

            const response = await axios.post('create-order/', formData)
            console.log(response.data.order_oid);

            navigate(`/checkout/${response.data.order_oid}`);

        } catch (error) {
            console.log(error);
        }
    }





    return (
        <div>
            <main className="mt-5">
                <div className="container">
                    {/*Main layout*/}
                    <main className="mb-6">
                        <div className="container">
                            {/* Section: Cart */}
                            <section className="">
                                <div className="row gx-lg-5 mb-5">
                                    <div className="col-lg-8 mb-4 mb-md-0">
                                        {/* Section: Product list */}
                                        <section className="mb-5">

                                            {cart.map((c, index) => (
                                                <div key={c.id || index} className="row border-bottom mb-4">
                                                    <div className="col-md-2 mb-4 mb-md-0">
                                                        <div
                                                            className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                                                            data-ripple-color="light"
                                                        >
                                                            <Link to={`/detail/${c?.product?.slug}`}>
                                                                <img
                                                                    src={c?.product?.image}
                                                                    className="w-100"
                                                                    alt=""
                                                                    style={{ height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                                                />
                                                            </Link>
                                                            <a href="#!">
                                                                <div className="hover-overlay">
                                                                    <div
                                                                        className="mask"
                                                                        style={{
                                                                            backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                                                                        }}
                                                                    />
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 mb-4 mb-md-0">
                                                        <Link to={`/detail/${c.product.slug}`} className="fw-bold text-dark mb-4">{c?.product?.title.slice(0, 20)}...</Link>
                                                        {c.size != "No Size" &&
                                                            <p className="mb-0">
                                                                <span className="text-muted me-2">Size:</span>
                                                                <span>{c.size}</span>
                                                            </p>
                                                        }
                                                        {c.color != "No Color" &&
                                                            <p className='mb-0'>
                                                                <span className="text-muted me-2">Color:</span>
                                                                <span>{c.color}</span>
                                                            </p>
                                                        }
                                                        <p className='mb-0'>
                                                            <span className="text-muted me-2">Price:</span>
                                                            <span>{addon.currency_sign} {c.product.price}</span>
                                                        </p>
                                                        <p className='mb-0'>
                                                            <span className="text-muted me-2">Stock Qty:</span>
                                                            <span>{c.product.stock_qty}</span>
                                                        </p>
                                                        <p className='mb-0'>
                                                            <span className="text-muted me-2">Vendor:</span>
                                                            <span>{c.product.vendor.name}</span>
                                                        </p>
                                                        <p className="mt-3">
                                                            <button onClick={() => handleDeleteClick(cart_id, c.id)} className="btn btn-danger ">
                                                                <small><i className="fas fa-trash me-2" />Remove</small>
                                                            </button>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2 mb-4 mb-md-0">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <div className="form-outline">
                                                                <input
                                                                    type="number"
                                                                    id={`qtyInput-${c.product.id}`}
                                                                    className="form-control"
                                                                    onChange={(e) => handleQtyChange(e, c.product.id)}
                                                                    value={productQuantities[c.product.id] || c.qty}
                                                                    min={1}

                                                                />
                                                            </div>
                                                            <button onClick={() => UpdateCart(cart_id, c.id, c.product.id, c.product.price, c.product.shipping_amount, c.color, c.size)} className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button>
                                                        </div>
                                                        <h5 className="mb-2 mt-3 text-center"><span className="align-middle">{addon.currency_sign} {c.sub_total}</span></h5>
                                                    </div>
                                                </div>
                                            ))}

                                            {cart.length < 1 &&
                                                <>
                                                    <h5>Your Cart Is Empty</h5>
                                                    <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                                                </>
                                            }

                                        </section>
                                        <div>
                                            <h5 className="mb-4 mt-4">Personal Information</h5>
                                            {/* 2 column grid layout with text inputs for the first and last names */}
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                                                        <input
                                                            type="text"
                                                            id=""
                                                            name='fullName'
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={fullName}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='email'
                                                            onChange={handleChange}
                                                            value={email}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='mobile'
                                                            onChange={handleChange}
                                                            value={mobile}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="mb-1 mt-4">Shipping address</h5>

                                            <div className="row mb-4">
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Address</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='address'
                                                            onChange={handleChange}
                                                            value={address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> City</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='city'
                                                            onChange={handleChange}
                                                            value={city}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> State</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='state'
                                                            onChange={handleChange}
                                                            value={state}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Country</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='country'
                                                            onChange={handleChange}
                                                            value={country}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-4 mb-md-0">
                                        {/* Section: Summary */}
                                        <section className="shadow-4 p-4 rounded-5 mb-4">
                                            <h5 className="mb-3">Cart Summary</h5>
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Subtotal </span>
                                                <span>{addon.currency_sign} {cartTotal.sub_total?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Shipping </span>
                                                <span>{addon.currency_sign} {cartTotal.shipping?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Tax </span>
                                                <span>{addon.currency_sign} {cartTotal.tax?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Service Fee </span>
                                                <span>{addon.currency_sign} {cartTotal.service_fee?.toFixed(2)}</span>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between fw-bold mb-5">
                                                <span>Total </span>
                                                <span>{addon.currency_sign} {cartTotal.total?.toFixed(2)}</span>
                                            </div>
                                            {cart.length > 0 &&
                                                <button
                                                    onClick={createCartOrder}
                                                    className="btn btn-primary btn-rounded w-100"
                                                >
                                                    Checkout
                                                </button>
                                            }
                                        </section>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    )
}

export default Cart