import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentWrapper from '../lib/ContentWrapper';
import { Label } from 'reactstrap';
import { Link } from 'react-router-dom';

function PostDetail() {
    const params = useParams()

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/blog/${params.id}`)
            .then(res => {
                setData(res.data);
                return res.data.userId;
            })
    }, [])

    return (
        <>
            <ContentWrapper>
                {
                    data ?
                        <div className="row pt-2">
                            <div className="col-md-12 mb-4">
                                <Label className="font-weight-bold">User</Label>
                                <p className="text-muted">
                                    Name:
                                    <Link
                                        to={`/profile/${data.user._id}`}
                                        className='text-success ml-2'
                                    >
                                        {
                                            data.user?.fullname || ''
                                        }
                                    </Link>
                                </p>
                                <Label className="font-weight-bold">Title</Label>
                                <p className="text-muted">
                                    {
                                        data.title ? data.title : ''
                                    }
                                </p>
                            </div>
                            <div className="col-md-12 mb-4">
                                <Label className="font-weight-bold">Body</Label>
                                <p className="text-muted">
                                    {
                                        data.description ? data.description : ''
                                    }
                                </p>
                            </div>
                        </div>
                        :
                        <div className="alert alert-info">
                            Information not found.
                        </div>
                }
            </ContentWrapper>
        </>
    )
}

export default PostDetail
