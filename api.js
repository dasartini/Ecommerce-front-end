import axios from "axios";

export const allProducts = () =>{

    return axios.get("http://localhost:5000/products")
    .then((data)=>{
       return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const getCategories = () =>{

    return axios.get("http://localhost:5000/categories")
    .then((data)=>{
        return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const getProductById = (id) =>{
    return axios.get(`http://localhost:5000/products/${id}`)
    .then((data)=>{
        return data.data
    }) .catch((err)=>{
        console.error(err)
    })

}