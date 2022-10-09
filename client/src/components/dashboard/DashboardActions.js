import React from 'react'
import { Link } from 'react-router-dom';
const DashboardActions = ({}) => {
  return (
    <div className="dash-buttons">
        <Link Link to ='/edit-profile' className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>

<Link  to =  "/profile" className="btn btn-light"><i className="fas fa-user-circle text-primary">
    
</i> View Profile</Link>

<Link  to =  "/transaction" className="btn btn-light"><i className="fas fa-user-circle text-primary">
    
</i> Transaction</Link>
        {/* <a Link to='/add-experience' className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</a> */}
       
      </div>
  )
}

export default DashboardActions



// import React from 'react'
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { getProfileById } from '../../actions/profile';

// const DashboardActions = ({  profile: {
//     getProfileById,
//     user: { _id, name, email },
// //     pan,
// //     address,
// //    phone,
    
//   },}) => {
//   return (
//     <div className="dash-buttons">
//         <Link Link to ='/edit-profile' className="btn btn-light"
//           ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>

// <Link Link to ={`/profile/${_id}`} className="btn btn-light"
//           ><i className="fas fa-user-circle text-primary"></i> View Profile</Link>
//         {/* <a Link to='/add-experience' className="btn btn-light"
//           ><i className="fab fa-black-tie text-primary"></i> Add Experience</a> */}
       
//       </div>
//   )
// }

// DashboardActions.propTypes = {
//     profile: PropTypes.object.isRequired,
//   };
  

// export default DashboardActions



