import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Chart from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';


function Dashboard() {

  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState(null)
  const [orders, setOrders] = useState(null)
  const [orderChartData, setOrderChartData] = useState(null)
  const [productsChartData, setProductsChartData] = useState(null)


  const axios = apiInstance
  const userData = UserData()
  const navigate = useNavigate()

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }


  if (userData?.vendor_id !== 0) {

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/stats/${userData?.vendor_id}/`)
          setStats(response.data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/products/${userData?.vendor_id}/`)
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/orders/${userData?.vendor_id}/`)
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const order_response = await axios.get(`vendor-orders-report-chart/${userData?.vendor_id}/`);
        setOrderChartData(order_response.data);

        const product_response = await axios.get(`vendor-products-report-chart/${userData?.vendor_id}/`);
        setProductsChartData(product_response.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchChartData();
  }, [])

  const order_months = orderChartData?.map(item => item.month);
  const order_counts = orderChartData?.map(item => item.orders);

  const product_labels = productsChartData?.map(item => item.month);
  const product_count = productsChartData?.map(item => item.orders);

  const order_data = {
    labels: order_months,
    datasets: [
      {
        label: "Total Orders",
        data: order_counts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },


    ]
  }

  const product_data = {
    labels: product_labels,
    datasets: [
      {
        label: "Total Products",
        data: product_count,
        fill: true,
        backgroundColor: "#ba9ede",
        borderColor: "#6100e0"
      },


    ]
  }



  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main mt-4">
          <div className="row mb-3 text-white">
            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-success">
                <div className="card-block bg-success p-3">
                  <div className="rotate">
                    <i className="bi bi-grid fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Products</h6>
                  <h1 className="display-1">{stats?.products || 0}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-danger">
                <div className="card-block bg-danger p-3">
                  <div className="rotate">
                    <i className="bi bi-cart-check fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Orders</h6>
                  <h1 className="display-1">{stats?.orders || 0}</h1>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-warning">
                <div className="card-block bg-warning p-3">
                  <div className="rotate">
                    <i className="bi bi-currency-dollar fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Revenue</h6>
                  <h1 className="display-1">${stats?.revenue || 0}</h1>
                </div>
              </div>
            </div>
          </div>
          {/*/row*/}
          <hr />
          <div className="row mb-1 mt-4">
            <div className="col">
              <h4>Chart Analytics</h4>
            </div>
          </div>
          <Link className='btn btn-primary me-2'>Daily Report</Link>
          <Link className='btn btn-primary me-2'>Monthly Report</Link>
          <Link className='btn btn-primary me-2'>Yearly Report</Link>
          <div className="row my-2">
            <div className="col-lg-6 ">
              <div className="card">
                <div className="card-body" >
                  <Line data={order_data} style={{ height: 300, minWidth: "630px" }} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body" >
                  <Line data={product_data} style={{ height: 300, minWidth: "630px" }} />
                </div>
              </div>
            </div>
          </div>
          <a id="layouts" />
          <div className="mb-3 mt-5" style={{ marginBottom: 300 }}>
            <nav className='mb-5'>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"> <i className='bi bi-grid-fill'></i> Product</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"> <i className='fas fa-shopping-cart'></i> Orders</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <h4>Products</h4>
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p, index) => (
                      <tr key={index}>
                        <th scope="row">#{p.sku}</th>
                        <td>{p.title}</td>
                        <td>${p.price}</td>
                        <td>{p.stock_qty}</td>
                        <td>{p.order_count}</td>
                        <td>{p?.status?.toUpperCase()}</td>
                        <td>
                          <Link to={`/detail/${p.slug}`} className="btn btn-primary mb-1 me-2"><i className="fas fa-eye" /></Link>
                          <Link to="" className="btn btn-success mb-1 me-2"><i className="fas fa-edit" /></Link>
                          <Link to="" className="btn btn-danger mb-1 me-2"><i className="fas fa-trash" /></Link>
                        </td>
                      </tr>
                    ))}

                    {products < 1 &&
                      <tr>
                        <td colSpan="7" className="text-center">
                        <h5 className='mt-4 p-3'>No products yet</h5>
                        </td>
                      </tr>
                    }


                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <h4>Products</h4>
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, index) => (
                      <tr key={index}>
                        <th scope="row">#{o.oid}</th>
                        <td>{o.full_name}</td>
                        <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                        <td>{o.order_status}</td>
                        <td>
                          <a href="" className="btn btn-primary mb-1">
                            <i className="fas fa-eye" />
                          </a>

                        </td>
                      </tr>
                    ))}

                    {orders < 1 &&
                      <tr>
                        <td colSpan="7" className="text-center">
                          <h5 className='mt-4 p-3'>No orders yet</h5>
                        </td>
                      </tr>
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard