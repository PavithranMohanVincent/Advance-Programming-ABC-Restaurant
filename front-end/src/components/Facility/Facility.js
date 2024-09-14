import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Facility = () => {
    return (
        <>
            {/* Service Section */}
            <section className="bg-service bg-section" id="service">
                <div className="container-fluid text-center">
                    <h1 className="container-h1">Service</h1>
                    <div className="row service-round-3 slideanim">
                        <div className="col-sm-4 text-center round">
                            <div className="service-round b-party">
                                <i className="fa fa-4x fa fa-birthday-cake sr-icons"></i>
                            </div>
                            <h4>Birthday party</h4>
                            <p>For more information please contact us.</p>
                        </div>
                        <div className="col-sm-4 text-center round">
                            <div className="service-round wedding">
                                <i className="fa fa-4x fa fa-heart sr-icons"></i>
                            </div>
                            <h4>Wedding</h4>
                            <p>For more information please contact us</p>
                        </div>
                        <div className="col-sm-4 text-center round">
                            <div className="service-round b-dinner">
                                <i className="fa fa-4x fa fa-suitcase sr-icons"></i>
                            </div>
                            <h4>Business dinner</h4>
                            <p>For more information please contact us.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="bg-gallery no-padding">
                <div className="container-fluid text-center mt-5">
                <h1 className="container-h1">Gallery</h1>
                    <hr className="hr-h3s" />
                    <div className="row no-gutter gallery slideanim">
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s1.jpg" className="card-img-top" alt="Gallery Image 1" />
                                <div className="card-body">
                                    <p className="card-text">We Provide Bar Service</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s2.jpg" className="card-img-top" alt="Gallery Image 2" />
                                <div className="card-body">
                                    <p className="card-text">We have good Seating.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s3.jpg" className="card-img-top" alt="Gallery Image 3" />
                                <div className="card-body">
                                    <p className="card-text">We have best Chefs.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s4.jpg" className="card-img-top" alt="Gallery Image 4" />
                                <div className="card-body">
                                    <p className="card-text">We have clean kitchen.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s5.jpg" className="card-img-top" alt="Gallery Image 5" />
                                <div className="card-body">
                                    <p className="card-text">We have good exterior and interior.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="card">
                                <img src="https://res.cloudinary.com/dbte0ueti/image/upload/v1536952203/new/s6.jpg" className="card-img-top" alt="Gallery Image 6" />
                                <div className="card-body">
                                    <p className="card-text">We have best food in town..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};

export default Facility;
