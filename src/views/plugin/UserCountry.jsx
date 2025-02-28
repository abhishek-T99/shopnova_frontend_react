import React, { useEffect, useState } from "react";

// This functional component, GetCurrentAddress, is responsible for retrieving and displaying the user's current address based on their geolocation coordinates.

function GetCurrentAddress() {
    // Initialize a state variable 'add' to store the user's current address.
    const [add, setAdd] = useState('');

    // The 'useEffect' hook is used to execute side effects in function components. In this case, it's used to fetch the user's address based on geolocation when the component mounts (empty dependency array).
    useEffect(() => {
        // The 'navigator.geolocation.getCurrentPosition' function is used to retrieve the user's current geolocation coordinates.
        navigator.geolocation.getCurrentPosition(pos => {
            // Extract the latitude and longitude from the position coordinates.
            const { latitude, longitude } = pos.coords;

            // Create a URL to query the OpenStreetMap Nominatim API for reverse geocoding based on the obtained coordinates.
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            // Perform an HTTP fetch request to the API URL and handle the response data.
            fetch(url)
                .then(res => res.json()) // Convert the response to JSON format.
                .then(data => setAdd(data.address)) // Set the 'add' state with the user's address information from the API response.
        });
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts.

    // The 'add' state variable now contains the user's current address information.

    // Return the user's current address, which will be rendered by the component that uses this function.
    return add;
}

// Export the GetCurrentAddress component for use in other parts of the application.
export default GetCurrentAddress;
