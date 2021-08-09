import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import Profile from "../components/profile"
import PrivateRoute from "../components/privateRoute"
import { login, isAuthenticated, getUser } from "../services/auth"

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>
const App = () => {
    if (!isAuthenticated()) {
        login()
        return <p>Redirecting to login...</p>
    }

    const user = getUser()

    return (
        <>
            <Layout>
                <nav>
                    <Link to="/app">App</Link>{` `}
                </nav>
                <Router>
                    <PrivateRoute path="/app/profile" component={Profile} />
                </Router>
            </Layout>
        </>
    )
}

export default App