import {API} from "../globles/config"
import axios from  "axios"

const imageUplaod = async(data)=>{
    return await axios.post(`${API}postimage`,data).then((responce)=>{
       return responce.data;
    })
}

const imageGetList = async()=>{
    return await axios.get(`${API}getImage`).then((responce)=>{
      
        return responce.data;
    })
}

export const  imageData = {
    imageUplaod,imageGetList
}