import { useEffect } from 'react';
import { logout } from '../../utils/auth';
import { Link } from 'react-router-dom';


const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return (
        <>
            <section>
                <main className="" style={{ marginBottom: 400, marginTop: 150 }}>
                    <div className="container">
                        <section className="">
                            <div className="row d-flex justify-content-center">
                                <div className="col-xl-5 col-md-8">
                                    <div className="card rounded-5">
                                        <div className="card-body p-4">
                                            <h3 className="text-center">You have been logged out</h3>
                                            <div className="d-flex justify-content-center" >
                                                <Link to="/login" className='btn btn-primary me-2'>Login <i className='fas fa-sign-in-alt'></i> </Link>
                                                <Link to="/login" className='btn btn-primary'>Register <i className='fas fa-user-plus'></i> </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Logout;