import auth0 from "auth0-js"
import { navigate } from "gatsby"

// detect when we are not running in a browser (e.g. Gatsby build time)
export const isBrowser = () => typeof window !== "undefined"

const auth = isBrowser ?
    new auth0.WebAuth({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENTID,
        redirectUri: process.env.AUTH0_CALLBACK,
        responseType: "token id_token",
        scope: "openid profile email",
    })
    :
    {}

const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
    if (!isBrowser) {
        return
    }
    return localStorage.getItem("isAuthenticated") === "true"
}

export const login = () => {
    if (!isBrowser) {
        return
    }
    auth.authorize()
}

export const logout = () => {
    localStorage.setItem("isAuthenticated", false)
    user = false

    const { protocol, host } = window.location
    const returnTo = `${protocol}//${host}`
    console.log(`Returning to ${returnTo}`)
    auth.logout({ returnTo })
}

export const silentAuth = callback => {
    if (!isAuthenticated()) {
        return callback()
    }
    auth.checkSession({}, setSession(callback))
}

const setSession = (callback = () => {}) => (err, authResult) => {
    if (err) {
        console.error(JSON.stringify(err))
        navigate("/")
        callback()
        return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        tokens.accessToken = authResult.accessToken
        tokens.idToken = authResult.idToken
        tokens.expiresAt = expiresAt
        user = authResult.idTokenPayload
        localStorage.setItem("isAuthenticated", true)
        // TODO use recent navigation history to do a smart redirect to the user's intended page
        navigate("/app")
        callback()
    }
}

export const handleAuthentication = () => {
    if (!isBrowser) {
        return
    }

    auth.parseHash(setSession())
}

export const getUser = () => {
    return user;
}
