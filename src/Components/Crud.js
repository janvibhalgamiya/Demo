import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userSubmit } from '../redux/Action';
import {useDispatch, useSelector } from 'react-redux';

function Crud({  }) {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
       
    });
    // const [userDetailsDummy, setUserDetailsDummy] = useState({ ...userDetails });
    const [userData, setUserData] = useState([]);
    const [index, setIndex] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formData = useSelector((state) => state?.editData)
    const tableData = useSelector((state) => state?.data || [])
    useEffect(() => {
        if (id) {
            setUserDetails(formData);
        }
        setUserData(tableData);
    }, []);

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            let interests = [...userDetails.interests];
            if (e.target.checked) {
                interests.push(e.target.value);
            } else {
                let id = interests.indexOf(e.target.value);
                interests.splice(id, 1);
            }
            setUserDetails({ ...userDetails, interests : [...interests] });
        } else {
            setUserDetails({ ...userDetails, [e.target.name] : e.target.value });
        }
    };

    const handleSubmit = () => {
        const data = [...userData]
        if (id) {
            data[id] = userDetails;
            setUserData(data);
            setIndex("");
        } else {
            data.push(userDetails)
            setUserData(data);
        }
        dispatch(userSubmit(data))
        navigate("/table");
        clearForm();
    };


    const clearForm = () => {
        setUserDetails({
            firstName: "",
            lastName: "",
           
        });
        setIndex("");
    };

    const buttonText = index !== "" ? "Update" : "Submit";
    return (
        <div className="container">
            <h3 className="alert alert-primary text-center" style={{marginTop : "100px"}}>Contact Form</h3>
            <div className="employee-form">
                <div className="form-group">
                    <label htmlFor="fname">First name :- </label>
                    <input type="text" className="form-control" name="firstName" id="fname" value={userDetails.firstName} onChange={handleChange} placeholder="Please enter your name..." />
                </div>

                <div className="form-group">
                    <label htmlFor="lname">Last name :- </label>
                    <input type="text" className="form-control" name="lastName" id="lname" value={userDetails.lastName} onChange={handleChange} placeholder="Please enter your name..." />
                </div>

               

               
                <div className="form-group">
                    <button type="button" className="btn btn-primary mr-2" onClick={handleSubmit}>{buttonText}</button>
                    <button type="button" className="btn btn-danger" onClick={clearForm}>Reset</button>
                </div>
            </div>
        </div>
    );
}



export default (Crud);
