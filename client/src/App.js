import React, {Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Transaction from './components/transaction/Transaction' ;
import CreateProfile from './components/profile.forms/CreateProfile';
import EditProfile from './components/profile.forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';

import {Provider} from 'react-redux'
import store from './store';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const  App = ()=>{ 

useEffect(()=>{
  store.dispatch(loadUser());
},[])
  return(
<Provider store = {store}>
  <Router>
    <Fragment>
        <Navbar />
        
        <section className="container">
        <Alert />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/transaction'
            element={<Transaction />}  />
          <Route
            path='/dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path='/create-profile'
            element={<PrivateRoute component={CreateProfile} />}
          />
          <Route
            path='/edit-profile'
            element={<PrivateRoute component={EditProfile} />}
          />

          </Routes>
          </section>
          </Fragment>
    </Router> 
    </Provider>


  
);

}
export default App;
