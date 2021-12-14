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

function ContentWrapper() {

    const [data, setData] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (res.status) {
                    setData(res.data);
                }
            })
    }

    const editData = (e) => {
        console.log('e', e);
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
        dataField: 'actions',
        text: '',
        headerAttrs: {
            hidden: true
        },
        formatter: (cell, row) => {
            return (
                <div className='d-flex justify-content-end'>
                    <Button color='primary' className='ml-3'>
                        DETAY
                    </Button>
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
            <div className='content-wrapper'>
                {
                    data.length ?
                        <>
                            <div className="mt-4">
                                <BootstrapTable
                                    keyField='id'
                                    data={data}
                                    columns={columns}
                                    bordered={false}
                                    wrapperClasses="table-responsive"
                                    pagination={paginationFactory(options)}
                                />
                            </div>
                        </>
                        : <div className="alert alert-info">
                            No relevant info was found on this page.
                        </div>
                }
            </div>
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
                                                name="name"
                                                placeholder='Enter post title'
                                            />
                                        </div>
                                        <div className="col-md-12 mb-4">
                                            <Label for="serial" className="font-weight-bold">Body</Label>
                                            <Input
                                                type='textarea'
                                                name="serial"
                                                placeholder="Enter post body"
                                                defaultValue={selectedRow.serial}
                                            />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={toggleEditModal}>Ləğv et</Button>
                                    <Button
                                        type="submit"
                                        color="success"
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

export default ContentWrapper
