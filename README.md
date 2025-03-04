[![Netlify Status](https://api.netlify.com/api/v1/badges/6155925a-f436-467d-9a15-690719ae1f0c/deploy-status)](https://app.netlify.com/sites/ecommerce-app-react99/deploys)

# E-Commerce Application

This is the E-Commerce Application, built with **React (Vite)** and fully integrated with the Django API.  
It provides a seamless shopping experience for **customers** and an interactive **dashboard** for vendors.

---

## Features

### Authentication

- User **Login & Registration**
- **Forgot Password** with email reset link
- Secure authentication using JWT tokens

### Customer Features

- Browse **Product Listings** with search & filtering
- View **Product Details** with reviews & ratings
- **Add to Cart** and **Wishlist**
- **Checkout** and make payments via **Stripe & PayPal**
- Receive **Payment Receipt** via email or download it
- Manage **Account Details**
- View **Orders & Order Details**
- View & manage **Wishlist**
- View & mark **Notifications as Seen**
- **Logout** securely

### Vendor Features

- **Dashboard** with sales statistics & interactive charts
- **Manage Products**: Add, update, delete
- **View Orders** with order details
- **Track Earnings** from sales
- **Manage Customer Reviews** (view & reply)
- **Add/Remove Discount Coupons**
- **View Notifications** and mark as seen
- **Edit Shop Profile**
- **Logout** securely

---

## Tech Stack

- **React** (Vite)
- **Zustand** (State Management)
- **Bootstrap** (UI Styling)
- **FontAwesome** (Icons)
- **Stripe & PayPal** (Payments)
- **Netlify** (Deployment)

---

## Prerequisites

Before setting up the project, make sure you have the following installed on your system:

- Node.js (LTS Version)
- Yarn - The package manager for this project
- Git - Required for cloning the repository

---

## Environment Variables

To run this project, you need to set up the following environment variables. Create a `.env` file in the root directory and add the following:

`VITE_PAYPAL_CLIENT_ID=<add your paypal client id>`

`VITE_SERVER_URL=<add your server URL>`

`VITE_API_BASE_URL=<add your API base URL>`

---

## Setup Guide

Follow these steps to set up and run the **E-Commerce Application** locally.

## Step 1: Clone the Repository

First, clone the project from GitHub and navigate into the project directory.

```bash
git clone https://github.com/abhishek-T99/ecommerce_frontend.git
cd ecommerce_frontend
```

## Step 2: Set up environment variables

Create a `.env` file in the project root and add the environment variables listed in the Environment Variables section above

## Step 3: Install Dependencies

```bash
yarn install
```

## Step 4: Start the Development Server

```bash
yarn dev
```

## Step 5: Access E-Commerce Application website

```bash
http://localhost:5000
```

---

## Contributing

I welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this repository to create your own copy.

2. **Clone the Forked Repository**:
   
   ```bash
   git clone https://github.com/abhishek-T99/ecommerce_frontend.git
   cd ecommerce_frontend
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**: Implement your feature or fix bugs. Ensure your code follows the project's coding standards.

5. **Commit Your Changes**:

   ```bash
   git add .
   git commit -m "feat: Your feature or fix description"
   ```

6. **Push to Your Branch**:

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Open a Pull Request**:

   - Go to the original repository on GitHub.
   - Click on the **"Pull Requests"** tab.
   - Click the **"New Pull Request"** button.
   - Select your forked repository and the branch you created (`feature/YourFeatureName`).
   - Add a detailed description of your changes
   - Submit the pull request.

---

## TODO:

- [ ] Improve UI design using Tailwind or Material UI
- [ ] Implement dark mode for better user experience
- [ ] Add unit tests and integration tests

---

