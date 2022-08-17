import AlertContext from "./AlertContext";
import React, { useState } from 'react'

function AlertState(props) {
    const [alert, setAlert] = useState(null);

    // shows current alert
    const ShowAlert = (cType, cMessage) =>{
        setAlert({
            type: cType,
            message: cMessage
        });

        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }


  return (
    <AlertContext.Provider value={{alert, ShowAlert}}>
        {props.children}
    </AlertContext.Provider>

  )
}

export default AlertState
