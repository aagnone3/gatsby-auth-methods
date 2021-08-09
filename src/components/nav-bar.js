import React from "react"
import { Link, navigate } from "gatsby"

import { getUser, isAuthenticated, logout } from "../services/auth"

export default function NavBar() {
    let greetingMessage = isAuthenticated() ?
        `Hello ${getUser().name}`
        :
        `You are not logged in`

    return (
        <div
            style={{
                display: "flex",
                flex: "1",
                justifyContent: "space-between",
                borderBottom: "1px solid #d1c1e0"
            }}
        >
            <span>{greetingMessage}</span>
            <nav>
                {isAuthenticated() ?
                    <>
                        <Link to="/account/profile">Profile</Link>{` `}
                        <Link to="/account/settings/">Settings</Link>{` `}
                        <Link to="/account/billing/">Billing</Link>{` `}
                        <a
                            href="#logout"
                            onClick={e => {
                                logout()
                                e.preventDefault()
                            }}
                        >
                            Log Out
                        </a>
                    </>
                    :
                    <Link to="/app">Log In</Link>
                }
            </nav>
        </div>
    )
}