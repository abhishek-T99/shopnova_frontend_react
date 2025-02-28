import apiInstance from '../../utils/axios';
import Swal from 'sweetalert2'

export const addToWishlist = async (productId, userId) => {
    const axios = apiInstance;

    try {
        // Create a new FormData object to send product information to the server
        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('user_id', userId);

        // Send a POST request to the server's 'customer/wishlist/create/' endpoint with the product information
        const response = await axios.post('customer/wishlist/create/', formData);

        // Log the response data from the server
        console.log(response.data);

        Swal.fire({
            icon: 'success',
            title: response.data.message,
        })

        // Set the loading state to "Added To Cart" upon a successful response
        // isAddingToWishlist(true);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);

        // Set the loading state to "An Error Occurred" in case of an error
        // isAddingToWishlist(false);

    }
}