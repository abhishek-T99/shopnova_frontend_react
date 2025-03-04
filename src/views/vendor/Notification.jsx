import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';


function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [notificationStats, setNotificationStats] = useState([]);
  const [seenNotification, setSeenNotifications] = useState([]);

  const axios = apiInstance;
  const userData = UserData();

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const fetchUnseenData = async () => {
    try {
      const response = await axios.get(`vendor-notifications-unseen/${userData?.vendor_id}/`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSeenData = async () => {
    try {
      const response = await axios.get(`vendor-notifications-seen/${userData?.vendor_id}/`);
      setSeenNotifications(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchStatsData = async () => {
    try {
      const response = await axios.get(`vendor-notifications-summary/${userData?.vendor_id}/`);
      setNotificationStats(response.data[0]);
    } catch (error) {
      console.error('Error fetching stats data:', error);
    }
  };

  useEffect(() => {
    fetchUnseenData();
  }, [userData?.vendor_id]);

  useEffect(() => {
    fetchSeenData();
  }, [userData?.vendor_id]);

  useEffect(() => {
    fetchStatsData();
  }, [userData?.vendor_id]);

  const handleNotificationSeenStatus = async (notiId) => {
    try {
      const response = await axios.get(`vendor-notifications-mark-as-seen/${userData?.vendor_id}/${notiId}/`);
      console.log(response.data);
      await fetchStatsData();
      await fetchUnseenData();
      await fetchSeenData();
    } catch (error) {
      console.error('Error marking notification as seen:', error);
    }
  };


  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main mt-4">
          <h4 className="mt-3 mb-1"><i className="bi bi-bell-fill" /> Notifications</h4>
          <div className="dropdown">
          </div>
          <div className="col-md-12 col-lg-12 main mt-4">
            <div className="row mb-3">
              <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                  <div className="card-block bg-danger p-3">
                    <div className="rotate">
                      <i className="fas fa-eye-slash fa-3x" />
                    </div>
                    <h6 className="text-uppercase">Un-read Notification</h6>
                    <h1 className="display-1">{notificationStats.un_read_noti}</h1>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                  <div className="card-block bg-success p-3">
                    <div className="rotate">
                      <i className="fas fa-eye fa-3x" />
                    </div>
                    <h6 className="text-uppercase">Read Notification</h6>
                    <h1 className="display-1">{notificationStats.read_noti}</h1>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                  <div className="card-block bg-primary p-3">
                    <div className="rotate">
                      <i className="bi bi-bell-fill fa-3x" />
                    </div>
                    <h6 className="text-uppercase">All Notification</h6>
                    <h1 className="display-1">{notificationStats.all_noti}</h1>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row  container">
              <div className="col-lg-12">


                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Message</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications?.map((noti, index) => (
                      <tr key={index}>
                        <td>
                          {noti.order !== null &&
                            <p>New Order {noti?.order?.oid}</p>
                          }
                        </td>
                        <td>
                          {noti.order_item !== null &&
                            <p>You've got a new order for <b>{noti?.order_item?.product?.title}</b></p>
                          }

                        </td>
                        <td>
                          {noti.seen === true
                            ? <p>Read <i className="fas fa-eye" /></p>
                            : <p>Unread <i className="fas fa-eye-slash" /></p>
                          }
                        </td>
                        <td>{moment(noti.date).format("MMM/DD/YYYY")}</td>
                        <td>
                          {noti.seen === true
                            ? <button disabled className="btn btn-success mb-1">
                              <i className="fas fa-check-circle" />
                            </button>

                            : <button onClick={() => handleNotificationSeenStatus(noti.id)} className="btn btn-secondary mb-1">
                              <i className="fas fa-eye" />
                            </button>

                          }

                        </td>
                      </tr>
                    ))}

                    {notifications.length < 1 &&
                      <h4 className='mt-4 p-3'>No Notification Yet</h4>
                    }

                    <button type="button" className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      View All Read Notifications
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">All Read Notifications</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <table className="table">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Type</th>
                                  <th scope="col">Message</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {seenNotification?.map((noti, index) => (
                                  <tr key={index}>
                                    <td>
                                      {noti.order !== null &&
                                        <p>New Order {noti?.order?.oid}</p>
                                      }
                                    </td>
                                    <td>
                                      {noti.order_item !== null &&
                                        <p>You've got a new order for <b>{noti?.order_item?.product?.title}</b></p>
                                      }

                                    </td>
                                    <td>
                                      {noti.seen === true
                                        ? <p>Read <i className="fas fa-eye" /></p>
                                        : <p>Unread <i className="fas fa-eye-slash" /></p>
                                      }
                                    </td>
                                    <td>{moment(noti.date).format("MMM/DD/YYYY")}</td>

                                  </tr>
                                ))}

                                {seenNotification.length < 1 &&
                                  <h4 className='mt-4 p-3'>No Read Notification Yet</h4>
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>


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

export default Notifications