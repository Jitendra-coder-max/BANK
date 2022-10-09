import React, { useState, Fragment , useEffect } from 'react'
import { Link, withRouter,useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile,getCurrentProfile } from '../../actions/profile';


// const CreateProfile = ({ createProfile, history }) => {

//     const [formData, setFormData] = useState({
//         pan: '',
//         address: '',
//         phone: ''
//     });

//     const {
//         pan,
//         address,
//         phone
//     } = formData



//     const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = (e) => {
//         e.preventDefault();
//         createProfile(formData, history);
//       };


const initialState = {
    pan: '',
    address: '',
    phone: ''
  };
  
  const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile
  }) => {
    const [formData, setFormData] = useState(initialState);
  
    const creatingProfile = useMatch('/create-profile');
  
    // const [displaySocialInputs, toggleSocialInputs] = useState(false);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      // if there is no profile, attempt to fetch one
      if (!profile) getCurrentProfile();
  
      // if we finished loading and we do have a profile
      // then build our profileData
      if (!loading && profile) {
        const profileData = { ...initialState };
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        // for (const key in profile.social) {
        //   if (key in profileData) profileData[key] = profile.social[key];
        // }
        // the skills may be an array from our API response
        // if (Array.isArray(profileData.skills))
        //   profileData.skills = profileData.skills.join(', ');
        // set local state with the profileData
        setFormData(profileData);
      }
    }, [loading, getCurrentProfile, profile]);
  
    const {
    pan,
    address,
    phone
      
    } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, navigate, profile ? true : false);
    };



    return (
        <Fragment>
            <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Add some changes to your profile'}
      </p>
           
            <form className="form"  onSubmit={ e =>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Pan card" name="pan" value={pan}
            onChange={(e) => onChange(e) }/>

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Address" name="address" value={address}
            onChange={(e) => onChange(e) }/>

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Phone no." name="phone" value={phone}
            onChange={(e) => onChange(e) } />

                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
            </section>
        </Fragment>
    );
};

// CreateProfile.propTypes = {
//     createProfile: PropTypes.func.isRequired,
//   };
  
//   export default connect(null, { createProfile })(withRouter(CreateProfile));


EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    EditProfile
  );