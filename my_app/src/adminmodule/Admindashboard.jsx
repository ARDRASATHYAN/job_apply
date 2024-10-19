import React from 'react';
import Adminnavbar from './Adminnavbar';

const Admindashboard = () => {
  return (
    <>
      <Adminnavbar />
      <div style={{ marginLeft: 240, padding: 20 ,color:"white"}}> {/* Offset for the sidebar */}
        <h1>Admin Dashboard</h1>
      </div>
    </>
  );
};

export default Admindashboard;
