import React, { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext'


function Alert() {
    const context = useContext(AlertContext);
    const { alert } = context;

    const Capitalize = (word) => {
        // In case of type danger , type should be 'Error'
        if (word === 'danger') {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{height:'1rem'}}>
            {alert && <div style={{ height: '1rem' }} className={`alert alert-${alert.type} alert-dismissible fade show d-flex align-items-center justify-content-center`} role="alert">
                <strong>{Capitalize(alert.type)}</strong>: {alert.message}
            </div>}
        </div>
    )
}

export default Alert
