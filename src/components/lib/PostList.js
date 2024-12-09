import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import swal from "sweetalert";
import {
    Button,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import { Link } from 'react-router-dom';

function PostList() {
    const [data, setData] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:8080/api/blog/list')
            .then(res => {
                if (res.status) {
                    setData(res.data);
                }
            })
    }

    const editData = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        }

        if (!data.title) {
            swal("Failed!", "Title could not be empty!", "error");
            return;
        };
        if (!data.body) {
            swal("Failed!", "Body could not be empty!", "error");
            return;
        }

        axios.put(`https://jsonplaceholder.typicode.com/posts/${selectedRow.id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Success!", "Data successfully updated!", "success");
                    getData();
                    toggleEditModal();
                }
            })
    }

    const deleteData = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
                        .then(res => {
                            if (res.status) {
                                swal("Data has been deleted!", {
                                    icon: "success",
                                });
                            }
                        })
                } else {
                    swal("Data was not deleted!");
                }
            });
        getData();

    }

    const toggleEditModal = () => {
        setIsOpenEditModal(!isOpenEditModal);
    }

    const columns = [{
        dataField: 'id',
        text: 'No.',
        headerAttrs: {
            hidden: true
        },
        formatter: (cell, row, index) => {
            return <span className='table-index'>{index + 1}</span>
        },
    }, {
        dataField: 'title',
        text: 'Ad',
        headerAttrs: {
            hidden: true
        }
    }, {
        dataField: 'user.fullname',
        headerAttrs: {
            hidden: true
        }
    }, {
        dataField: 'actions',
        text: '',
        headerAttrs: {
            hidden: true
        },
        formatter: (cell, row) => {
            return (
                <div className='table-buttons'>
                    <Link
                        to={`/post/${row._id}`}
                        className='btn btn-primary ml-3'
                    >
                        DETAY
                    </Link>
                    <Button
                        color='success'
                        className='ml-3'
                        onClick={() => {
                            setSelectedRow(row)
                            toggleEditModal();
                        }}
                    >
                        DÜZENLE
                    </Button>
                    <Button
                        color='danger'
                        className='ml-3'
                        onClick={() => deleteData(row.id)}
                    >
                        SİL
                    </Button>
                </div>
            )
        },
    }]

    const options = {
        paginationSize: 3,
        sizePerPage: 6, // which size per page you want to locate as default
        hideSizePerPage: true, // You can hide the dropdown for sizePerPage
        alwaysShowAllBtns: false, // Always show next and previous button
        // withFirstAndLast: false // Hide the going to First and Last page button
    };

    return (
        <>
            {
                data.length ?
                    <>
                        <BootstrapTable
                            keyField='id'
                            data={data}
                            columns={columns}
                            bordered={false}
                            wrapperClasses="table-responsive"
                            pagination={paginationFactory(options)}
                        />
                    </>
                    : <div className="alert alert-info">
                        No relevant info was found on this page.
                    </div>
            }
            {/* edit modal */}
            <Modal isOpen={isOpenEditModal} centered size="md">
                <ModalHeader toggle={toggleEditModal}>Düzenle</ModalHeader>
                <Form onSubmit={e => editData(e)}>
                    {
                        selectedRow ?
                            <>
                                <ModalBody>
                                    <div className="row pt-2">
                                        <div className="col-md-12 mb-4">
                                            <Label className="font-weight-bold">Title</Label>
                                            <Input
                                                name="title"
                                                placeholder='Enter post title'
                                                defaultValue={selectedRow.title}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-4">
                                            <Label for="serial" className="font-weight-bold">Body</Label>
                                            <Input
                                                type='textarea'
                                                name="body"
                                                placeholder="Enter post body"
                                                defaultValue={selectedRow.body}
                                            />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter className='d-flex justify-content-start'>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="font-weight-bold"
                                    >
                                        Güncelle
                                    </Button>
                                </ModalFooter>
                            </>
                            :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="alert alert-warning">
                                        Məlumat tapılmadı
                                    </div>
                                </div>
                            </div>
                    }
                </Form>
            </Modal>
        </>
    )
}

export default PostList
