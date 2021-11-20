const accessToken = "accessToken"

export const isLoggedIn = () => {
    return getAccessToken(accessToken) ? true : false
}

export const getAccessToken = () => {
    return localStorage.getItem(accessToken)
}

export const logout = () => {
    localStorage.removeItem(accessToken)
}

