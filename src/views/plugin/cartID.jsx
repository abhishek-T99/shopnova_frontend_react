function CartID() {
    // Function to generate a random string with the desired length
    const generateRandomString = () => {
        const length = 30; // Desired length of the random string
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Characters to choose from
        let randomString = '';

        for (let i = 0; i < length; i++) {
            // Generate a random index to select a character from the 'characters' string
            const randomIndex = Math.floor(Math.random() * characters.length);
            // Append the selected character to the 'randomString'
            randomString += characters.charAt(randomIndex);
        }

        // Store the generated 'randomString' in localStorage for later use
        localStorage.setItem('randomString', randomString);
    };

    // Function to check if the random string exists in localStorage
    const existingRandomString = localStorage.getItem('randomString');

    if (!existingRandomString) {
        // Random string doesn't exist in localStorage, generate and add it
        generateRandomString();
    } else {
        // Log the existing 'randomString' found in localStorage
        // console.log(`Random string in localStorage: ${existingRandomString}`);
    }

    // Return the existing 'randomString' or 'undefined' if it doesn't exist
    return existingRandomString;
}

export default CartID;
