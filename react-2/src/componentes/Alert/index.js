import React from "react";
import "./Alert.css";

function Alert() {
    return (
        <div className="alert alert-danger alert-dismissible" role="alert">
        <strong>Oops!</strong> Error. Porfavor, vuelve a intentarlo.
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
  
  export default Alert;