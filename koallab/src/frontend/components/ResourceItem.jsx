import React from "react";

const ResourceItem = ({ resource }) => {
  return (
    <div
      style={{
        // backgroundColor: "rgba(255,255,255,0.2)",
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: "10px",
        margin: "10px",
        color: 'white',
        padding: '10px',
        width: '170px',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img src={resource.file} alt="Resource" width={"120px"} />
      <p style={{ color: 'white'}}>Superman Flying.jpg</p>
    </div>
  );
};

export default ResourceItem;
