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
        console.log(data)
        return data.data
    }) .catch((err)=>{
        console.error("there was an error:", err)
    })

}

export const checkout = (customerData, currentBasket, totalPrice) =>{
    return axios.post("http://localhost:5000/checkout",{
        items : currentBasket,
        total_price: totalPrice,
        customer_name: customerData.purchase_units[0].shipping.name.full_name,
        payment_status: "Successfull",
        transaction_id: customerData.purchase_units[0].payments.captures[0].id
    })
    .then((data)=>{
        console.log(data)
        return data.data
    }) .catch((err)=>{
        console.error("there was an error:", err)
    })
}