import { getUserData } from "../../pages/actions/actions";


export function downlodeDataReducer(state = {}, action) {

    if (action.type === "download_data") {
        console.log(action.payload);
        return {
            ...state,
            userData: action.payload.userData
        };
    }
    else {
        return state;
    }

}

export function editUserData(payload) {
    return {
        type: "download_data",
        payload
    }
}

export function downloadUserData() {
    return (dispatch) => {
        return (
            getUserData()
                .then((res) => {
                    if (res) {
                        dispatch(editUserData({ userData: res.data }));
                    }
                })
                .catch(e => console.log(e))
        );
    }
}