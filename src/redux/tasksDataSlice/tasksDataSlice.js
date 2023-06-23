import { getTasks } from "../../pages/actions/actions";

export function downloadTasksReducer(state = {}, action) {
   
    if (action.type === "download_tasks") {
        return {
           ...state,
           tasksData: action.payload.tasksData
        };
    } 
    else {
        return state;
    }

}

export function editTasksData(payload) {
    return {
        type: "download_tasks",
        payload
    }
}


export function downloadTasksData() {
    return (dispatch) => {
        return (
            getTasks()
                .then((res) => {
                    if (res) {
                        dispatch(editTasksData({tasksData:res.data}));
                    }
                
                })
                .catch(e => console.log(e))
        );
    }
}