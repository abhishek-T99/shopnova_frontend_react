import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
    <>
        <section>
            <main className="" style={{ marginBottom: 400, marginTop: 150 }}>
                <div className="container">
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card-body p-1">
                                    <div style={{ textAlign: 'center'}}>
                                        <h1>404 - Page Not Found</h1>
                                        <p>The page you are looking for does not exist.</p>
                                        <Link to="/">Go Back to Home</Link>
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

export default PageNotFound;