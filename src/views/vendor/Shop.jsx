import { React, useEffect, useState, useContext } from 'react';
import { FaCheckCircle, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import '../styles/InvoiceStyle.css'

import apiInstance from '../../utils/axios';
import { CartContext } from '../plugin/Context';
import { addToWishlist } from '../plugin/addToWishlist';
import { addToCart } from '../plugin/addToCart';
import CartID from '../plugin/cartID';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import Addon from '../plugin/Addon';

function Shop() {
    const [products, setProduct] = useState([])
    const [vendor, setVendor] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [colorImage, setColorImage] = useState("")
    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)
    let [cartCount, setCartCount] = useContext(CartContext);

    let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
    const [loadingStates, setLoadingStates] = useState({});

    const axios = apiInstance
    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    let cart_id = CartID()
    const addon = Addon()
    const param = useParams()
    
    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }

    useEffect(() => {
        axios.get(`vendor-products/${param?.slug}/`).then((res) => {
            setProduct(res.data);
        })
    }, [param])

    useEffect(() => {
        axios.get(`shop/${param?.slug}/`).then((res) => {
            setVendor(res.data);
            console.log(res.data);
        })
    }, [param])


    const handleColorButtonClick = (event, product_id, colorName, colorImage) => {
        setColorValue(colorName);
        setColorImage(colorImage);
        setSelectedProduct(product_id);

        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: colorName,
        }));


    };

    const handleSizeButtonClick = (event, product_id, sizeName) => {
        setSizeValue(sizeName);
        setSelectedProduct(product_id);

        setSelectedSize((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: sizeName,
        }));

    };

    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value);
        setSelectedProduct(product_id);
    };


    const handleAddToCart = async (product_id, price, shipping_amount) => {
        setLoadingStates((prevStates) => ({
            ...prevStates,
            [product_id]: 'Adding...',
        }));


        try {
            await addToCart(product_id, userData?.user_id, qtyValue, price, shipping_amount, currentAddress.country, colorValue, sizeValue, cart_id, setIsAddingToCart)

            // After a successful operation, set the loading state to false
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Added to Cart',
            }));



            setColorValue("No Color");
            setSizeValue("No Size");
            setQtyValue(0)

            const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
            const response = await axios.get(url);

            setCartCount(response.data.length);
            console.log(response.data.length);


        } catch (error) {
            console.log(error);

            // In case of an error, set the loading state for the specific product back to "Add to Cart"
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Add to Cart',
            }));
        }


    };


    const handleAddToWishlist = async (product_id) => {
        try {
            await addToWishlist(product_id, userData?.user_id)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <main className="mt-5">
            <div className="container">
                <section className="text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <img
                                src={vendor.image}
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    borderRadius: "50%"
                                }}
                                alt=""
                            />
                            <h1 className="fw-light">{vendor.name}</h1>
                            <p className="lead text-muted">
                                {vendor.description}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h4 className="mb-4">{products?.length} Product(s) </h4>
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-lg-4 col-md-12 mb-4" key={index}>
                                <div className="card">
                                    <div
                                        className="bg-image hover-zoom ripple"
                                        data-mdb-ripple-color="light"
                                    >
                                        <Link to={`/detail/${product.slug}`}>
                                            <img
                                                src={(selectedProduct === product.id && colorImage) ? colorImage : product.image}
                                                className="w-100"
                                                style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                            />
                                        </Link>
                                        <a href="#!">
                                            <div className="mask">
                                                <div className="d-flex justify-content-start align-items-end h-100">
                                                    <h5>
                                                        <span className="badge badge-primary ms-2">New</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="hover-overlay">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="card-body">

                                        <Link to={`/detail/${product.slug}`} className="text-reset"><h5 className="card-title mb-3 ">{product.title.slice(0, 30)}...</h5></Link>
                                        <Link to="/" className="text-reset"><p>{product?.brand.title}</p></Link>
                                        <h6 className="mb-3">{addon.currency_sign} {product.price}</h6>

                                        {((product.color && product.color.length > 0) || (product.size && product.size.length > 0)) ? (
                                            <div className="btn-group">
                                                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                                                    Variation
                                                </button>
                                                <ul className="dropdown-menu" style={{ maxWidth: "400px" }} aria-labelledby="dropdownMenuClickable">
                                                    {/* Quantity */}
                                                    <div className="d-flex flex-column mb-2 mt-2 p-1">
                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                            <>
                                                                <li>
                                                                    <input
                                                                        type="number"
                                                                        className='form-control'
                                                                        placeholder='Quantity'
                                                                        onChange={(e) => handleQtyChange(e, product.id)}
                                                                        min={1}
                                                                        defaultValue={1}
                                                                    />
                                                                </li>
                                                            </>
                                                        </div>
                                                    </div>

                                                    {/* Size */}
                                                    {product?.size && product?.size.length > 0 && (
                                                        <div className="d-flex flex-column">
                                                            <li className="p-1"><b>Size</b>: {selectedSize[product.id] || 'Select a size'}</li>
                                                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                {product?.size?.map((size, index) => (
                                                                    <>
                                                                        <li key={index}>
                                                                            <button
                                                                                className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                onClick={(e) => handleSizeButtonClick(e, product.id, size.name)}
                                                                            >
                                                                                {size.name}
                                                                            </button>
                                                                        </li>
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}


                                                    {/* Color */}
                                                    {product.color && product.color.length > 0 && (
                                                        <div className="d-flex flex-column mt-3">
                                                            <li className="p-1 color_name_div"><b>Color</b>: {selectedColors[product.id] || 'Select a color'}</li>
                                                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                {product?.color?.map((color, index) => (
                                                                    <>
                                                                        <input type="hidden" className={`color_name${color.id}`} name="" id="" />
                                                                        <li key={index}>
                                                                            <button
                                                                                key={color.id}
                                                                                className="color-button btn p-3 me-2"
                                                                                style={{ backgroundColor: color.color_code }}
                                                                                onClick={(e) => handleColorButtonClick(e, product.id, color.name, color.image)}
                                                                            >
                                                                            </button>
                                                                        </li>
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Add To Cart */}
                                                    <div className="d-flex mt-3 p-1 w-100">
                                                        <button
                                                            onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                            disabled={loadingStates[product.id] === 'Adding...'}
                                                            type="button"
                                                            className="btn btn-primary me-1 mb-1"
                                                        >
                                                            {loadingStates[product.id] === 'Added to Cart' ? (
                                                                <>
                                                                    Added to Cart <FaCheckCircle />
                                                                </>
                                                            ) : loadingStates[product.id] === 'Adding...' ? (
                                                                <>
                                                                    Adding to Cart <FaSpinner className='fas fa-spin' />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {loadingStates[product.id] || 'Add to Cart'} <FaShoppingCart />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </ul>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                disabled={loadingStates[product.id] === 'Adding...'}
                                                type="button"
                                                className="btn btn-primary me-1 mb-1"
                                            >
                                                {loadingStates[product.id] === 'Added to Cart' ? (
                                                    <>
                                                        Added to Cart <FaCheckCircle />
                                                    </>
                                                ) : loadingStates[product.id] === 'Adding...' ? (
                                                    <>
                                                        Adding to Cart <FaSpinner className='fas fa-spin' />
                                                    </>
                                                ) : (
                                                    <>
                                                        {loadingStates[product.id] || 'Add to Cart'} <FaShoppingCart />
                                                    </>
                                                )}
                                            </button>

                                        )}

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={() => handleAddToWishlist(product.id)}
                                            type="button"
                                            className="btn btn-danger px-3 ms-2 "
                                        >
                                            <i className="fas fa-heart" />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/*Section: Wishlist*/}
            </div>
        </main>

    )
}

export default Shop