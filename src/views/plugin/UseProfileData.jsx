import React, { useState, useEffect } from 'react'
import apiInstance from '../../utils/axios';
import UserData from './UserData';


function UseProfileData() {
    const [profile, setProfile] = useState([])

    const axios = apiInstance
    const userData = UserData()

    useEffect(() => {
        axios.get(`user/profile/${userData?.user_id}/`).then((res) => {
            setProfile(res.data);
        })
    }, [])
    return profile
}

export default UseProfileData