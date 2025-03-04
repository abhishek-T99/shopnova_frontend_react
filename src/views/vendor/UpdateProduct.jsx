import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';


function UpdateProduct() {
  const userData = UserData()
  const axios = apiInstance
  const param = useParams()


  const [product, setProduct] = useState([]);
  const [specifications, setSpecifications] = useState([{ title: '', content: '' }]);
  const [colors, setColors] = useState([{ name: '', color_code: '', image: null }]);
  const [sizes, setSizes] = useState([{ name: '', price: 0.00 }]);
  const [gallery, setGallery] = useState([{ image: null }]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const navigate = useNavigate()

  // console.log("specifications: ", specifications)
  // console.log("colors: ", colors)
  // console.log("sizes: ", sizes)
  // console.log("gallery: ", gallery)

  const handleAddMore = (setStateFunction) => {
    setStateFunction((prevState) => [...prevState, {}]);
  };

  const handleRemove = (index, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleInputChange = (index, field, value, setStateFunction) => {
    setStateFunction((prevState) => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };


  const handleImageChange = (index, event, setStateFunction) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setStateFunction((prevState) => {
          const newState = [...prevState];
          newState[index].image = { file, preview: reader.result };
          return newState;
        });
      };

      reader.readAsDataURL(file);
    } else {
      // Handle the case when no file is selected
      setStateFunction((prevState) => {
        const newState = [...prevState];
        newState[index].image = null; // Set image to null
        newState[index].preview = null; // Optionally set preview to null
        return newState;
      });
    }
  };


  const handleProductInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    })
  };

  useEffect(() => {
    // Fetch product details from the backend
    const fetchProductDetails = () => {

      setProduct({
        ...product,
        image: product.image
      });
    };

    fetchProductDetails();
  }, []);



  // const handleProductFileChange = (event) => {

  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setProduct({
  //         ...product,
  //         image: {
  //           file: file,
  //           preview: reader.result
  //         }
  //       });
  //     };

  //     reader.readAsDataURL(file);
  //   } else {
  //     // Handle the case when no file is selected
  //     setProduct({
  //       ...product,
  //       image: product.image
  //     });
  //   }
  // };


  const handleProductFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProduct({
        ...product,
        image: file,
      });
    } else {
      // Handle the case when no file is selected
      setProduct({
        ...product,
        image: null, // or whatever default value you want
      });
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      axios.get('category/').then((res) => {
        setCategory(res.data)
      })
    }
    fetchCategory()
  }, [])


  useEffect(() => {
    const fetchProductItems = async () => {
      axios.get(`vendor-product-edit/${userData?.vendor_id}/${param.pid}/`).then((res) => {
        setProduct(res.data)
        setColors(res.data.color)
        setSizes(res.data.size)
        setSpecifications(res.data.specification)
        setGallery(res.data.gallery)
      })
    }
    fetchProductItems()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (product.title == "" || product.description == "" || product.price == "" || product.category === null || product.shipping_amount == "" || product.stock_qty == "" || product.image === null) {
      setIsLoading(false)
      console.log("Please fill in all required fields");
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields!',
        text: "All fields are required to create a product",
      })
      return;
    }

    try {
      setIsLoading(true)
      const formData = new FormData();

      // Append product data
      // Object.entries(product)?.forEach(([key, value]) => {
      //   console.log(`key: ${key} - value : ${value}`);
      //   if (key === 'image' && value) {
      //     formData.append(key, value.file);  // Assuming 'value' is an object with 'file' property
      //   } else {
      //     formData.append(key, value);
      //   }
      // });

      Object.entries(product)?.forEach(([key, value]) => {
        console.log(`key: ${key} - value: ${value}`);
        if (key === 'image' && value) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      // Append specifications data
      specifications?.forEach((specification, index) => {
        Object.entries(specification).forEach(([key, value]) => {
          formData.append(`specifications[${index}][${key}]`, value);
        });
      });


      colors?.forEach((color, index) => {
        Object.entries(color).forEach(([key, value]) => {
          if (key === 'image' && value && value.file && value.file.type.startsWith('image/')) {
            formData.append(`colors[${index}][${key}]`, value.file, value.file.name);
          } else {
            console.log(String(value));
            formData.append(`colors[${index}][${key}]`, String(value)); // Convert `value` to a string
          }
        });
      });

      // Append sizes data
      sizes?.forEach((size, index) => {
        Object.entries(size).forEach(([key, value]) => {
          formData.append(`sizes[${index}][${key}]`, value);
        });
      });

      // Append gallery data
      gallery?.forEach((item, index) => {
        if (item.image) {
          formData.append(`gallery[${index}][image]`, item.image.file);
        }
      });

      const response = await apiInstance.patch(`vendor-product-edit/${userData?.vendor_id}/${param.pid}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/vendor/products/')

      Swal.fire({
        icon: 'success',
        title: 'Product Updated Successfully',
        text: 'This product has been successfully updated',
      });

      const data = await response.json();
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false)

    }
  };

  return (
    <div>
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
          <Sidebar />
          {/*/col*/}
          <div className="col-md-9 col-lg-10 main mt-4">
            <div className="container">
              <form className="main-body" method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="row gutters-sm shadow p-4 rounded">
                      <h4 className="mb-4">Product Details</h4>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                              {product.image && product.image.preview ? (
                                <img
                                  src={product.image.preview}
                                  alt="Product Thumbnail Preview"
                                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 10 }}
                                />
                              ) : (
                                <img
                                  src={product.image}
                                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 10 }}
                                  alt=""
                                />
                              )}

                              <div className="mt-3">
                                {product.title !== "" &&
                                  <h4 className="text-dark">{product.title}</h4>
                                }
                                {product.title === "" &&
                                  <h4 className="text-dark">Product Title</h4>
                                }
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                              <Link to={`/detail/${product.slug}/`} className='btn btn-success mt-4'><i className='fas fa-eye'></i></Link>
                              <Link className='btn btn-danger mt-4 ms-2'><i className='fas fa-trash'></i></Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="card mb-3">

                          <div className="card-body">

                            <div className="row text-dark">
                              <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Product Thumbnail
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="image"
                                  id=""
                                  onChange={handleProductFileChange || product.image}
                                />
                              </div>
                              <div className="col-lg-12 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id=""
                                  name="title"
                                  value={product.title || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id=""
                                  cols={30}
                                  rows={10}
                                  defaultValue={""}
                                  name="description"
                                  value={product.description || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-6 mb-2">
                                <label htmlFor="" className="mb-2">
                                  Category
                                </label>
                                <select
                                  className="select form-control"
                                  id=""
                                  name="category"
                                  value={product.category || ''}
                                  onChange={handleProductInputChange}
                                >
                                  <option value="">- Select -</option>
                                  {category?.map((c, index) => (
                                    <option key={index} value={c.id}>{c.title}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Brand
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="brand"
                                  value={product.brand || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Sale Price
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="price"
                                  value={product.price || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Regular Price
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="old_price"
                                  value={product.old_price || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Shipping Amount
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="shipping_amount"
                                  value={product.shipping_amount || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-6 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Stock Qty
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="stock_qty"
                                  value={product.stock_qty || ''}
                                  onChange={handleProductInputChange}
                                />
                              </div>
                              <div className="col-lg-12 mb-2 ">
                                <label htmlFor="" className="mb-2">
                                  Tags
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="tags"
                                  value={product.tags || ''}
                                  onChange={handleProductInputChange}
                                />
                                <span style={{ fontSize: 12 }} className='text-muted'>NOTE: Seperate tags with comma</span>

                              </div>
                            </div>

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
                    <div className="row gutters-sm shadow p-4 rounded">
                      <h4 className="mb-4">Product Image</h4>
                      <div className="col-md-12">
                        <div className="card mb-3">
                          <div className="card-body">
                            {gallery?.map((item, index) => (

                              <div className="row text-dark mb-5">
                                <div className="col-lg-3">
                                  {/* {item.image && (
                                    <img
                                      src={item.image.preview}
                                      alt={`Preview for gallery item ${index + 1}`}
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 5 }}
                                    />
                                  )} */}

                                  {item.image && (item.image.preview ? (
                                    <img
                                      src={item.image.preview}
                                      alt="Product Thumbnail Preview"
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 10 }}
                                    />
                                  ) : (
                                    <img
                                      src={item.image}
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 10 }}
                                      alt=""
                                    />
                                  ))}
                                  {!item.image && (
                                    <img
                                      src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                      alt={`Preview for gallery item ${index + 1}`}
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 5 }}
                                    />
                                  )}
                                </div>
                                <div className="col-lg-6 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Product Image
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                    onChange={(e) => handleImageChange(index, e, setGallery)}
                                  />
                                </div>
                                <div className="col-lg-3 mt-2">
                                  <button onClick={() => handleRemove(index, setGallery)} type='button' className='btn btn-danger mt-4'>Remove</button>
                                </div>

                              </div>
                            ))}

                            {gallery < 1 &&
                              <h4>No Images Selected</h4>
                            }

                            <button type='button' onClick={() => handleAddMore(setGallery)} className="btn btn-primary mt-2">
                              <i className="fas fa-plus" /> Add More Images
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div className="row gutters-sm shadow p-4 rounded">
                      <h4 className="mb-4">Specifications</h4>
                      <div className="col-md-12">
                        <div className="card mb-3">
                          <div className="card-body">

                            {specifications?.map((specification, index) => (

                              <div className="row text-dark">
                                <div className="col-lg-3 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={specification.title || ''}
                                    onChange={(e) => handleInputChange(index, 'title', e.target.value, setSpecifications)}

                                  />
                                </div>
                                <div className="col-lg-6 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Content
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={specification.content || ''}
                                    onChange={(e) => handleInputChange(index, 'content', e.target.value, setSpecifications)}

                                  />
                                </div>
                                <div className="col-lg-3 mb-2">
                                  <button type='button' onClick={() => handleRemove(index, setSpecifications)} className='btn btn-danger mt-4'>Remove</button>
                                </div>
                              </div>
                            ))}

                            {specifications?.length < 1 &&
                              <h4>No Specification Form</h4>
                            }

                            <button type='button' onClick={() => handleAddMore(setSpecifications)} className="btn btn-primary mt-2">
                              <i className="fas fa-plus" /> Add More Specifications
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-size"
                    role="tabpanel"
                    aria-labelledby="pills-size-tab"
                  >
                    <div className="row gutters-sm shadow p-4 rounded">
                      <h4 className="mb-4">Sizes</h4>
                      <div className="col-md-12">
                        <div className="card mb-3">
                          <div className="card-body">
                            {sizes?.map((s, index) => (

                              <div className="row text-dark">
                                <div className="col-lg-3 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Size
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="XXL"
                                    id=""
                                    value={s.name || ''}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value, setSizes)}

                                  />
                                </div>
                                <div className="col-lg-6 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Price
                                  </label>
                                  <input
                                    type="number"
                                    placeholder="$20"
                                    className="form-control"
                                    name=""
                                    id=""
                                    value={s.price || ''}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value, setSizes)}

                                  />
                                </div>
                                <div className="col-lg-3 mt-2">
                                  <button type='button' onClick={() => handleRemove(index, setSizes)} className='btn btn-danger mt-4'>Remove</button>
                                </div>
                              </div>
                            ))}
                            {sizes < 1 &&
                              <h4>No Size Added</h4>
                            }
                            <button type='button' onClick={() => handleAddMore(setSizes)} className="btn btn-primary mt-2">
                              <i className="fas fa-plus" /> Add More Sizes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-color"
                    role="tabpanel"
                    aria-labelledby="pills-color-tab"
                  >
                    <div className="row gutters-sm shadow p-4 rounded">
                      <h4 className="mb-4">Color</h4>
                      <div className="col-md-12">
                        <div className="card mb-3">
                          <div className="card-body">
                            {colors?.map((c, index) => (
                              <div className="row text-dark mb-3">
                                <div className="col-lg-2 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name=""
                                    placeholder="Green"
                                    id=""
                                    value={c.name || ''}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value, setColors)}

                                  />
                                </div>
                                <div className="col-lg-2 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Code
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="#f4f7f6"
                                    className="form-control"
                                    name=""
                                    id=""
                                    value={c.color_code || ''}
                                    onChange={(e) => handleInputChange(index, 'color_code', e.target.value, setColors)}

                                  />
                                </div>
                                <div className="col-lg-3 mb-2">
                                  <label htmlFor="" className="mb-2">
                                    Image
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    name=""
                                    id=""
                                    onChange={(e) => handleImageChange(index, e, setColors)}

                                  />
                                </div>

                                <div className="col-lg-3 mt-2">
                                  {c.image && (
                                    <img
                                      src={c.image.preview}
                                      alt={`Preview for gallery item ${index + 1}`}
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 5 }}
                                    />
                                  )}
                                  {!c.image && (
                                    <img
                                      src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                      alt={`Preview for gallery item ${index + 1}`}
                                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 5 }}
                                    />
                                  )}
                                </div>

                                <div className="col-lg-2 mt-2">
                                  <button type='button' onClick={() => handleRemove(index, setColors)} className='btn btn-danger mt-4'>Remove</button>
                                </div>

                              </div>
                            ))}

                            {colors < 1 &&
                              <h4>No Colors Added</h4>
                            }

                            <button type='button' onClick={() => handleAddMore(setColors)} className="btn btn-primary mt-2">
                              <i className="fas fa-plus" /> Add More Colors
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul
                      className="nav nav-pills mb-3 d-flex justify-content-center mt-5"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Basic Information
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Gallery
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          Specifications
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-size-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-size"
                          type="button"
                          role="tab"
                          aria-controls="pills-size"
                          aria-selected="false"
                        >
                          Size
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-color-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-color"
                          type="button"
                          role="tab"
                          aria-controls="pills-color"
                          aria-selected="false"
                        >
                          Color
                        </button>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center mb-5">
                      <button type='submit' className="btn btn-success w-50">
                        Create Product <i className="fa fa-check-circle" />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct