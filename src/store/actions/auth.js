import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = { email, password, returnSecureToken: true };

        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAj7MOWjKmWxUioYwMtOeoA3-oi7oZeFoA";

        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAj7MOWjKmWxUioYwMtOeoA3-oi7oZeFoA";
        }

        const res = await axios.post(url, authData);
        const data = res.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    };
};

export const autoLogout = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess());
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT,
    };
};

export const authSuccess = token => ({
    type: AUTH_SUCCESS,
    token,
});
