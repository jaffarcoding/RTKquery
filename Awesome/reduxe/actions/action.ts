
import axios from "axios";


export const dataaction = () => async (dispatch) => {
    try {
        dispatch({
            type: 'GETDATAP',
        });
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts")
        dispatch({
            type: "GETDATAF",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'GETDATAR',
            // payload: error.data
        })
    }
}