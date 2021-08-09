// detect when we are not running in a browser (e.g. Gatsby build time)
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () => {
    const user = window.localStorage.getItem("gatsbyUser")
    return isBrowser() && !!user ? JSON.parse(user) : {}
}

export const setUser = user =>
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
    if (username === `john` && password === `pass`) {
        return setUser({
            username: `john`,
            name: `Johhny`,
            email: `johnny@example.org`
        })
    }
    return false;
}

export const isLoggedIn = () => {
    const user = getUser()
    return !!user.username
}

export const logout = callback => {
    setUser({})
    callback()
}