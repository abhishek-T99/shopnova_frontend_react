import { React, useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart, FaSpinner } from 'react-icons/fa';

import apiInstance from '../../utils/axios';
import Addon from '../plugin/Addon';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CartID from '../plugin/cartID';
import { addToCart } from '../plugin/addToCart';
import { addToWishlist } from '../plugin/addToWishlist';
import { CartContext } from '../plugin/Context';


function Search() {

    const [products, setProducts] = useState([])

    let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
    const [loadingStates, setLoadingStates] = useState({});
    let [loading, setLoading] = useState(true);
    let [searchResults, setSearchResults] = useState([]);

    const addon = Addon()

    const axios = apiInstance
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    let cart_id = CartID()

    console.log("param", query);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [colorImage, setColorImage] = useState("")
    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)
    let [cartCount, setCartCount] = useContext(CartContext);

    // Define an async function for fetching data from an API endpoint and updating the state.
    // This function takes two parameters:
    // - endpoint: The API endpoint to fetch data from.
    // - setDataFunction: The state update function to set the retrieved data.
    async function fetchData(endpoint, setDataFunction) {
        try {
            // Send an HTTP GET request to the provided endpoint using Axios.
            const response = await axios.get(endpoint);

            // If the request is successful, update the state with the retrieved data.
            setDataFunction(response.data);
            if (products) {
                setLoading(false)
            }
        } catch (error) {
            // If an error occurs during the request, log the error to the console.
            console.log(error);
        }
    }

    

    useEffect(() => {
        // Fetch and set the 'products' data by calling fetchData with the 'products/' endpoint.
        fetchData(`search/?query=${query}`, setProducts);

    }, [query]);

    console.log(searchResults);


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
        <>
            {loading === false &&
                <div>
                    <main className="mt-5" style={{marginBottom:'100px'}}>
                        <div className="container">
                            <section className="text-center container">
                                <div className="row mt-4 mb-3">
                                    <div className="col-lg-6 col-md-8 mx-auto">
                                        <h1 className="fw-light">Search: "{query}"</h1>
                                    </div>
                                </div>
                            </section>
                            <section className="text-center">
                                <div className="row">
                                    {products.map((product, index) => (
                                        <div className="col-lg-4 col-md-12 mb-4" key={index.id}>
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
                                                </div>
                                                <div className="card-body">

                                                    <h6 className="">By: <Link to={`/vendor/${product?.vendor?.slug}`}>{product.vendor.name}</Link></h6>
                                                    <Link to={`/detail/${product.slug}`} className="text-reset"><h5 className="card-title mb-3 ">{product.title.slice(0, 30)}...</h5></Link>
                                                    <Link to="/" className="text-reset"><p>{product?.brand.title}</p></Link>
                                                    <h6 className="mb-1">{addon.currency_sign} {product.price}</h6>

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

                                    {products.length < 1 && 
                                        <h4>No Results For "{query}"</h4>
                                    }

                                </div>
                            </section>
                            {/*Section: Wishlist*/}
                        </div>
                    </main>
                </div>
            }

            {loading === true &&
                <div className="container text-center">
                    <img className='' src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif" alt="" />
                </div>
            }
        </>
    )
}

export default Search