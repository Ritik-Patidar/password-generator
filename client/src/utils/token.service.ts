function getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('loggedInUserInfo') || JSON.stringify({}));
    if (user && user?.tokens?.refresh) {
        return user?.tokens?.refresh?.token;
    }

}

function getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('loggedInUserInfo') || JSON.stringify({}));
    if (user && user?.tokens?.access) {
        return user?.tokens?.access?.token;
    }
    return null ;
}

function updateToken(token: any) {
    const user = JSON.parse(localStorage.getItem('loggedInUserInfo') || JSON.stringify({}));
    user.tokens = token;
    localStorage.setItem('loggedInUserInfo', JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem('loggedInUserInfo') || JSON.stringify({}));
}

function setUser(user: any) {
    localStorage.setItem('loggedInUserInfo',JSON.stringify(user));
}
function removeUser() {
    localStorage.removeItem('loggedInUserInfo');
}

export const tokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateToken,
    getUser,
    setUser,
    removeUser,
};
