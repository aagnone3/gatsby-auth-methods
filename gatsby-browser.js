/**
 * Client-side behavior customization for Gatsby
 */
import React from "react"
import { silentAuth } from "./src/services/auth"

/**
 * When page loads happen, run silent authentication
 */
class SessionCheck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    handleCheckSession = () => {
        this.setState({ loading: false })
    }

    componentDidMount() {
        silentAuth(this.handleCheckSession)
    }

    render() {
        return (
            this.state.loading === false && (
                <React.Fragment>{this.props.children}</React.Fragment>
            )
        )
    }
}

export const wrapRootElement = ({ element }) => {
    return <SessionCheck>{element}</SessionCheck>
}