import { Alert } from "react-native"

import { useAddNewPostMutation } from "../service/detapidata";
export const validation = async ({ texttitle, textbody }: any) => {
    console.log("Text is ==============="+texttitle);
    
    let mssg = ""
    let err = false
    if ( !texttitle) {
        err = true
        mssg = "Title should not be empty"
    }
    if(texttitle.length < 4){
        err = true
        mssg = "Title Should be greterthen 3 character"
    }
    if(textbody.length <= 10){
        err = true
        mssg = "Body Should be greterthen 10 character"
    }
    if(!textbody){
        err = true
        mssg = "body should not be empty"
    }
    return {error: err, message: mssg}
        
}