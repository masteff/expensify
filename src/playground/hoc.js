import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>the info is: {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is private Info.Please dont share</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated && <WrappedComponent {...props}/>}
            {!props.isAuthenticated && <p>Please login to see this message</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info='these are the details'/>,document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info='these are the details'/>,document.getElementById('app'))