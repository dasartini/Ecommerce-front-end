import axios from "axios";

export const allProducts = () =>{

    return axios.get("http://localhost:4000/products")
    .then((data)=>{
       return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}