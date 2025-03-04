import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [updateReviews, setUpdateReviews] = useState({ reply: "" })

  const axios = apiInstance
  const userData = UserData()

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`vendor-reviews/${userData?.vendor_id}/`)
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReplyChange = (event) => {
    console.log(updateReviews.reply);
    setUpdateReviews({
      ...updateReviews,
      [event.target.name]: event.target.value
    })
  }

  const handleReplySubmit = async (reviewId) => {
    reviewId.preventDefault()
    const formdata = new FormData()

    formdata.append('reply', updateReviews.reply)

    await axios.patch(`vendor-reviews/${userData?.vendor_id}/${reviewId}`, formdata).then((res) => {
      console.log(res.data);
    })

  }

  console.log(updateReviews);

  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main mt-4">
          <h4>
            <i className="fas fa-star" /> Reviews and Rating
          </h4>

          <section
            className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
            style={{
              backgroundImage:
                "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
            }}
          >
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-10">
                {reviews.map((review, index) => (
                  <div className="card mt-3 mb-3">
                    <div className="card-body m-3">
                      <div className="row">
                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                          <img
                            src={review.profile.image}
                            className="rounded-circle img-fluid shadow-1"
                            alt="woman avatar"
                            style={{ width: 200, height: 200, objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-lg-8">
                          <p className="text-dark  mb-2">
                            <b>Review: </b>
                            {review.review}
                          </p>
                          <p className="text-dark mb-2 d-flex">
                            <b>Reply: {""} </b>
                            {review.reply === null
                              ? <span className='ms-2'> No Response</span>
                              : <span className='ms-2'> {review.reply}</span>
                            }
                          </p>
                          <p className="text-dark mb-2">
                            <strong>Name</strong>:{review.profile.full_name}
                          </p>
                          <p className=" mb-2">
                            <b>Product</b>: {review?.product?.title}
                          </p>
                          <p className=" mb-0">
                            Rating:
                            {review.rating == 1 &&
                              <>
                                <span className='me-2 ms-2'>1</span>
                                < i className="fas fa-star" />
                              </>
                            }

                            {review.rating == 2 &&
                              <>
                                <span className='me-2 ms-2'>2</span>
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                              </>
                            }

                            {review.rating == 3 &&
                              <>
                                <span className='me-2 ms-2'>3</span>
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                              </>
                            }

                            {review.rating == 4 &&
                              <>
                                <span className='me-2 ms-2'>4</span>
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                              </>
                            }

                            {review.rating == 5 &&
                              <>
                                <span className='me-2 ms-2'>5</span>
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                                < i className="fas fa-star" />
                              </>
                            }
                          </p>
                          <div className="d-flex mt-3">
                            <div class="btn-group">
                              <Link to={`/vendor/reviews/${review.id}/`} class="btn btn-primary " >
                                <i className='fas fa-eye'></i> View Review
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


                {reviews < 1 &&
                  <h5 className='mt-4 p-3'>No reviews yet</h5>
                }

              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default Reviews