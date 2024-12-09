import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentWrapper from '../lib/ContentWrapper';
import { Label } from 'reactstrap';
import { Link } from 'react-router-dom';

function Profile() {
    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log('params', params);
        axios.get(`http://localhost:8080/api/user/${params.id}`)
            .then(res => setData(res.data));
    }, [])

    return (
        <ContentWrapper>
            {
                data ?
                    <div className="row pt-2">
                        <div className="col-md-12 col-lg-6 mb-4">
                            <Label className="font-weight-bold">Profile</Label>
                            <p className="text-muted">
                                Name: <span className='font-weight-bold ml-1'>{data.fullname}</span>
                            </p>
                            <p className="text-muted">
                                Username: <span className='font-weight-bold ml-1'>{data.username}</span>
                            </p>
                            <p className="text-muted">
                                Email: <span className='font-weight-bold ml-1'>{data.email}</span>
                            </p>
                            <p className="text-muted">
                                Phone: <span className='font-weight-bold ml-1'>{data.phone}</span>
                            </p>
                            <p className="text-muted">
                                Website: <span className='font-weight-bold ml-1'>{data.website}</span>
                            </p>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <Label className="font-weight-bold">Address</Label>
                            {
                                data.address ?
                                    <>
                                        <p className="text-muted">
                                            City: <span className='font-weight-bold ml-1'>{data.address.city}</span>
                                        </p>
                                        <p className="text-muted">
                                            Street: <span className='font-weight-bold ml-1'>{data.address.street}</span>
                                        </p>
                                        <p className="text-muted">
                                            Suite: <span className='font-weight-bold ml-1'>{data.address.suite}</span>
                                        </p>
                                        <p className="text-muted">
                                            Zip: <span className='font-weight-bold ml-1'>{data.address.zipcode}</span>
                                        </p>
                                        <p className="text-muted">
                                            Geo: <span className='font-weight-bold ml-1'>
                                                {
                                                    data.address.geo ?
                                                        <span>{data.address.geo.lat} / {data.address.geo.lng}</span>
                                                        :
                                                        <div className="alert alert-info">
                                                            Information not found.
                                                        </div>
                                                }
                                            </span>
                                        </p>
                                    </>
                                    :
                                    <div className="alert alert-info">
                                        Information not found.
                                    </div>
                            }
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <Label className="font-weight-bold">Work</Label>
                            {
                                data.company ?
                                    <>
                                        <p className="text-muted">
                                            Company: <span className='font-weight-bold ml-1'>{data.company.name}</span>
                                        </p>
                                        <p className="text-muted">
                                            Catch phrase: <span className='font-weight-bold ml-1'>{data.company.catchPhrase}</span>
                                        </p>
                                        <p className="text-muted">
                                            Bs: <span className='font-weight-bold ml-1'>{data.company.bs}</span>
                                        </p>
                                    </>
                                    :
                                    <div className="alert alert-info">
                                        Information not found.
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <div className="alert alert-info">
                        Information not found.
                    </div>
            }
        </ContentWrapper>
    )
}

export default Profile
