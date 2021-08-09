import React from "react"
import { Link } from "gatsby"

import { getUser, isAuthenticated } from "../services/auth"
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Hello {isAuthenticated() ? getUser().name : "stranger!"}</h1>
      <p>
        {isAuthenticated() ? (
          <>
            You are logged in, so check your{` `}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
          You should <Link to="/app/login">log in</Link> to see catered content
          </>
        )}
      </p>
    </Layout>
  )
}
