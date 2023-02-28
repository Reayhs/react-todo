import React, { useEffect } from "react";

function Alert({type,msg, showAlert,list}) {
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <>
      {type == "success" &&  <p className={`alert alert-success`}>{msg}</p>}    
      {type == "error" &&  <p className={`alert alert-error`}>{msg}</p>}    
    </>
  );
}

export default Alert;
