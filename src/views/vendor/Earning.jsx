import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Line } from "react-chartjs-2";

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';


function Earning() {
  const [earningStats, setEarningStats] = useState(null)
  const [earningStatsTracker, setEarningTracker] = useState([])
  const [earningChartData, setEarningChartData] = useState(null)

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const axios = apiInstance
  const userData = UserData()

  useEffect(() => {
    const fetEarningStats = async () => {
      axios.get(`vendor-earning/${userData?.vendor_id}/`).then((res) => {
        setEarningStats(res.data[0])
      })

      axios.get(`vendor-monthly-earning/${userData?.vendor_id}/`).then((res) => {
        setEarningTracker(res.data)
        setEarningChartData(res.data)
      })
    }
    fetEarningStats()
  }, [])

  const months = earningChartData?.map(item => item.month);
  const revenue = earningChartData?.map(item => item.total_earning);
  const sales_count = earningChartData?.map(item => item.sales_count);


  const revenue_data = {
    labels: months,
    datasets: [
      {
        label: "Revenue Analytics",
        data: revenue,
        fill: true,
        backgroundColor: "#cdb9ed",
        borderColor: "#6203fc"
      },
    ]
  }
  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main">
          <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
            <h4><i class="fas fa-dollar-sign"></i> Earning and Revenue  </h4>

            <div className="col-xl-12 col-lg-12  mt-4">
              <div className="row mb-3 text-white">
                <div className="col-xl-6 col-lg-6 mb-2">
                  <div className="card card-inverse card-success">
                    <div className="card-block bg-success p-3">
                      <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                      </div>
                      <h6 className="text-uppercase">Total Sales</h6>
                      <h1 className="display-1"><b>${earningStats?.total_revenue || "0.00"}</b></h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-2">
                  <div className="card card-inverse card-danger">
                    <div className="card-block bg-danger p-3">
                      <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                      </div>
                      <h6 className="text-uppercase">Monthly Earning</h6>
                      <h1 className="display-1"><b>${earningStats?.monthly_revenue || "0.00"}</b></h1>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row  container">
                <div className="col-lg-12">
                  <h4 className="mt-3 mb-4">Revenue Tracker</h4>
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Sales</th>
                        <th scope="col">Revenue</th>
                        {/* <th scope="col">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {earningStatsTracker?.map((earning, index) => (
                        <tr>
                          {earning.month == 1 && <th scope="row">January </th>}
                          {earning.month == 2 && <th scope="row">February </th>}
                          {earning.month == 3 && <th scope="row">March </th>}
                          {earning.month == 4 && <th scope="row">April </th>}
                          {earning.month == 5 && <th scope="row">May </th>}
                          {earning.month == 6 && <th scope="row">June </th>}
                          {earning.month == 7 && <th scope="row">July </th>}
                          {earning.month == 8 && <th scope="row">August </th>}
                          {earning.month == 9 && <th scope="row">September </th>}
                          {earning.month == 10 && <th scope="row">October </th>}
                          {earning.month == 11 && <th scope="row">November </th>}
                          {earning.month == 12 && <th scope="row">December </th>}
                          <td>{earning.sales_count}</td>
                          <td>${earning.total_earning.toFixed(2)}</td>
                          {/* <td>
                            <a href="" className="btn btn-primary mb-1">
                              <i className="fas fa-eye" />
                            </a>
                          </td> */}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
                <div className="container">
                  <div className="row ">
                    <div className="col">
                      <h4 className="mt-4">Revenue Analytics</h4>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12 py-1">
                      <div className="card">
                        <div className="card-body">
                          <Line data={revenue_data} style={{ height: 300, minWidth: "630px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Earning