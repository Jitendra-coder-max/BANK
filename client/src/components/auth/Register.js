import React, { Fragment, useState } from 'react'
// import axios from 'axios';
import { setAlert } from '../../actions/alert';
import {register} from '../../actions/auth'
import {connect} from 'react-redux'
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types'


const Register = ({ setAlert,register, isAuthenticated }) => {

    const [formData,setFormData]= useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        accountBalance:' '
});

const { name,email,password,password2,accountBalance} = formData;

const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value})
const onSubmit = async e =>{
    e.preventDefault();
    if(password !==password2){
      setAlert('Passwords do not match', 'danger');
    }
    else{
      register({ name, email, password ,accountBalance});
    };
  
}

// Redirect if Register

if (isAuthenticated) {
  return <Navigate to="/dashboard" />;
}

    
    return (
        <Fragment>
          <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Bank Account of customer</p>
      <form className="form" onSubmit ={e =>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name}
          onChange={e=> onChange(e)} 
          // required 
          />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" 
          value={email}
          onChange={e=> onChange(e)}/>
         
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          onChange={e=> onChange(e)}
            // minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
          onChange={e=> onChange(e)}
            // minLength="6"
          />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Account Balance" name="accountBalance" 
          value={accountBalance}
          onChange={e=> onChange(e)} 
          // required 
          />
        </div>
        
        <input   type="submit" className="btn btn-primary shadow " value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
        </Fragment>
      );
    };
    Register.propTypes ={
      setAlert:PropTypes.func.isRequired,
      register:PropTypes.func.isRequired,
      isAuthenticated:PropTypes.bool
    }

    const mapStateToProps = (state) => ({
      isAuthenticated: state.auth.isAuthenticated,
    });

  

export default connect(mapStateToProps, {setAlert,register}) (Register);
// export default connect(mapStateToProps, {setAlert}) (Register);