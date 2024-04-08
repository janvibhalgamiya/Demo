import React, { useEffect, useState } from 'react';
import { userDelete, userEdit } from '../redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

function TableData({}) {
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch()
const navigate = useNavigate()
    const tableData = useSelector((state) => state?.data || [])

    useEffect(() => {
        setUserData(tableData);
    }, [tableData]);

    const handleDelete = (i) => {
       
       const confirmDelete = window.confirm;
        if (confirmDelete) {
            dispatch(userDelete(i))
        }
    };

    const handleEdit = (i) => {
        dispatch(userEdit(i))
        navigate(`/edit/${i}`);
    };

    const handleBack = () => {
        navigate("/");
    };

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstName',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastName',
        },
       
        {
            title: 'Edit',
            render: (item, data, i) => {
                return <button type="button" className="btn btn-sm btn-success mr-3" onClick={() => handleEdit(i)}><i className="fas fa-edit mr-1"></i> Edit</button>
            }
        },
        {
            title: 'Delete',
            render: (item, data, i) => {
                return <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(i)}><i className="fas fa-trash mr-1"></i>Delete</button>
            }
        },
    ];

    return (
        <div className='container'>
            <h3 className="alert alert-primary text-center" style={{marginTop : "100px"}}>Submitted Data</h3>
            <Table className="table-responsive" dataSource={userData} columns={columns} />
            <button type="button" className="btn btn-sm btn-success mt-3" onClick={handleBack}>
                <i className='fas fa-arrow-circle-left mr-2'></i>Back
            </button>
        </div>
    );
}


export default (TableData);
