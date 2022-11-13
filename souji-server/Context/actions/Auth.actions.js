import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT = 'LOGOUT'

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, data.user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Email hoặc mật khẩu của bạn không chính xác",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
}

export const logoutUser = (dispatch) => {
    fetch(`${baseURL}users/logout`, {
        method: "GET",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
            dispatch(setLogout())
    })

    // AsyncStorage.removeItem("jwt");
    // dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}

export const setLogout = () => {
    return {
        type: LOGOUT,
    }
}