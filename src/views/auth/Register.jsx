import { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setFullname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set isLoading to true when the form is submitted
        setIsLoading(true);

        const { error } = await register(fullname, email, phone, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }

        // Reset isLoading to false when the operation is complete
        setIsLoading(false);
    };

    return (
        <>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Register Account</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Full Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            onChange={(e) => setFullname(e.target.value)}
                                                            placeholder="Full Name"
                                                            required
                                                            className="form-control"

                                                        />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginName">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Email Address"
                                                            required
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginName">
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            placeholder="Mobile Number"
                                                            required
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginPassword">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="Password"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    {/* Password input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginPassword">
                                                            Confirm Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="confirm-password"
                                                            onChange={(e) => setPassword2(e.target.value)}
                                                            placeholder="Confirm Password"
                                                            required
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <p className='fw-bold text-danger'>
                                                        {password2 !== password ? 'Passwords do not match' : ''}
                                                    </p>

                                                    <button className='btn btn-primary w-100' type="submit" disabled={isLoading}>
                                                        {isLoading ? (
                                                            <>
                                                                <span className="mr-2 ">Processing...</span>
                                                                <i className="fas fa-spinner fa-spin" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="mr-2">Sign Up</span>
                                                                <i className="fas fa-user-plus" />
                                                            </>
                                                        )}
                                                    </button>

                                                    <div className="text-center">
                                                        <p className='mt-4'>
                                                            Already have an account? <Link to="/login">Login</Link>
                                                        </p>
                                                    </div>
                                                </form>


                                                {/* <form>
                                    <div className="text-center mt-4 mb-2">
                                    <p>Sign up with:</p>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-lg btn-floating"
                                        data-ripple-color="primary"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-lg btn-floating"
                                        data-ripple-color="primary"
                                    >
                                        <i className="fab fa-google" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-lg btn-floating"
                                        data-ripple-color="primary"
                                    >
                                        <i className="fab fa-twitter" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-lg btn-floating"
                                        data-ripple-color="primary"
                                    >
                                        <i className="fab fa-github" />
                                    </button>
                                    </div>
                                    
                                </form> */}
                                            </div>

                                        </div>
                                        {/* Pills content */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Section: Login form */}
                </div>
            </main>
        </>


    );
}

export default Register;
