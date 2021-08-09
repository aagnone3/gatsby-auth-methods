import React from "react"
import { isAuthenticated, login } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isAuthenticated()) {
        login()
        return <p>Redirecting to login...</p>
    }

    return <Component {...rest} />
}

export default PrivateRoute