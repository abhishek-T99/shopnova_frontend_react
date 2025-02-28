import { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';

function Addon() {
    // Initialize a state variable 'addon' as an empty array.
    const [addon, setAddon] = useState([])

    // Create an instance of Axios for making HTTP requests.
    const axios = apiInstance

    // Define an asynchronous function 'fetchData' for making GET requests and handling data.
    async function fetchData(endpoint, setDataFunction) {
        try {
            // Send an HTTP GET request to the provided 'endpoint' using Axios.
            const response = await axios.get(endpoint);

            // If the request is successful, update the state with the retrieved data.
            setDataFunction(response.data);
        } catch (error) {
            // If an error occurs during the request, log the error to the console.
            console.log(error);
        }
    }

    // Use the 'useEffect' hook to execute code when the component mounts (empty dependency array).
    useEffect(() => {
        // Fetch and set the 'addon' data by calling 'fetchData' with the 'addon/' endpoint.
        fetchData('addon/', setAddon);
    }, []);

    // Return the 'addon' state, which will be populated with data from the API.
    return addon;
}

export default Addon;
