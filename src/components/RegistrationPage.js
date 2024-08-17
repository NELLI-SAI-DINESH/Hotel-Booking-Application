import React, { useState } from 'react';
import '../css/style.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const initialFormData = {
    name: '',
    address: '',
    email: '',
    phone: '',
    password: '',
}

const initialFormError = {
    name: '',
    address: '',
    email: '',
    phone: '',
    password: '',
}



const RegistrationPage = () => {
    const [formData, setFormData]=useState(initialFormData);
    const [formError, setFormError]=useState(initialFormError);
    const [validPhone, setValidPhone]=useState(true);
    const [buttonText, setButtonText] = useState('Register');


    console.log(formData, formError)
    const handleChange =(e) => {

        const { name, value }=e.target;
        setFormData((prevData)=>({
            ...prevData,                          // spread operator previous data
            [name]: value
        }));
        if(name === 'name'){
            if(value.length <3) {
                setFormError((prevData) =>({
                    ...prevData,
                    [name]: 'Enter more than 3 characters'
                  }));

            }
            else{
                setFormError((prevData) => ({
                    ...prevData,
                    [name]:''
                }));
            }

        }

        if (name ==="password") {
            if(value.length < 8) {
                setFormError((prevData) => ({
                    ...prevData,
                    [name]:'makesure that the password is more than 8 characters'
                }));
            } else {
                setFormError((prevData) => ({
                    ...prevData,
                    [name]:''
                }));
            }

        }

        if(name ==="phone"){
            if(value.length < 10){
                setValidPhone(false);
            }
            else{
                setValidPhone(true);
             }
        }

    };

    const handlesubmit=(e) => {
        e.preventDefault();
        //Handle form submission here
        console.log(formData);
        axios.post("http://localhost:4001/users", formData)  //post frontend to back end
              .then((Response) =>{
                setFormData(initialFormData);
                console.log(Response.formData);
              })
              .catch((err) => {
                console.log("cant post");
              })
              setFormData(initialFormData);

              setButtonText('Registration success, Please Login :-)');

    };

    return (
        <>
        <div className="registration-container">
            <form className="registration-form" onSubmit={handlesubmit}>
            <h1>Student Registration</h1>

                <label htmlFor='name'>Name:</label>
                <input
                  id='name'
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {formError?.name?.length >0 && <div>{formError?.name}</div>}

                <label htmlFor='address'>Address:</label>
                <input
                  type='text'
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <label htmlFor='phone'>Phone No:</label>
                <input
                  type='text'
                  id="phone"
                  name="phone"
                  placeholder="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {!validPhone && <p>Please Enter a valid phone number</p>}

                <label htmlFor='email'>Email Id:</label>
                <input
                  type='text'
                  id="email"
                  name="email"
                  placeholder="Email Id:"
                  value={formData.email}
                  onChange={handleChange}
                  pattern='^([a-zA-Z0-9_\-\.]+)@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,})$'
                  title='for Eg: ABC@gmail.com'
                  required
                />

                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id="password"
                  name="password"
                  placeholder="password:"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formError?.password?.length > 0 && <div>{formError?.password}</div>}

                <button type="submit">{buttonText}</button>
                <p><Link to="/LoginPage">Login</Link>with your existing account</p>
            </form>
            </div>
            </>

    
    );
    

};

export default RegistrationPage;