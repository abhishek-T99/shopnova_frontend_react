import { useAuthStore } from '../../store/auth';
import Products from './Products';
// This is a functional component named 'Home.'
const Home = () => {

  // Using the 'useAuthStore' hook to get the user's authentication state.
  // It returns an array with two elements: isLoggedIn and user.
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <div>
      {/* Using a conditional statement to render different views based on whether the user is logged in or not. */}
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );
};

// This is another functional component named 'LoggedInView' which receives 'user' as a prop.
const LoggedInView = ({ user }) => {


  return (
    <div>
      <Products />
    </div>
  );
};

// This is a functional component named 'LoggedOutView,' which has an optional 'title' prop.
export const LoggedOutView = ({ title = 'Home' }) => {
  return (
    <div>
      <Products />
    </div>
  );
};

// Exporting the 'Home' component as the default export of this module.
export default Home;



















































// // This is a functional component named 'Home.'
// const Home = () => {
//     // Using the 'useAuthStore' hook to get the user's authentication state.
//     // It returns an array with two elements: isLoggedIn and user.
//     const [isLoggedIn, user] = useAuthStore((state) => [
//         state.isLoggedIn,
//         state.user,
//     ]);

//     return (
//         <div>
//             {/* Using a conditional statement to render different views based on whether the user is logged in or not. */}
//             {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
//         </div>
//     );
// };

// // This is another functional component named 'LoggedInView' which receives 'user' as a prop.
// const LoggedInView = ({ user }) => {
//     return (
//         <div>
//             <h1>Welcome {user.username}</h1>
//             {/* Creating a link to a private page with a button. */}
//             <Link to="/private">
//                 <button className='btn btn-primary me-2'>Private</button>
//             </Link>
//             {/* Creating a link for user logout with a button. */}
//             <Link to="/logout">
//                 <button className='btn btn-danger'>Logout</button>
//             </Link>
//         </div>
//     );
// };

// // This is a functional component named 'LoggedOutView,' which has an optional 'title' prop.
// export const LoggedOutView = ({ title = 'Home' }) => {
//     return (
//         <div>
//             {/* Displaying a title which defaults to 'Home' if not provided as a prop. */}
//             <h1>{title}</h1>
//             {/* Creating links for user login and registration with buttons. */}
//             <Link to="/login">
//                 <button>Login</button>
//             </Link>
//             <Link to="/register">
//                 <button>Register</button>
//             </Link>
//         </div>
//     );
// };

// // Exporting the 'Home' component as the default export of this module.
// export default Home;