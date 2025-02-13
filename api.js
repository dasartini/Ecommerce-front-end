import axios from "axios";

export const allProducts = () =>{

    return axios.get("https://cafe-tero.onrender.com/products")
    .then((data)=>{
       return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const getCategories = () =>{

    return axios.get("https://cafe-tero.onrender.com/categories")
    .then((data)=>{
        return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const createCategory = (name)=>{ 
    return axios.post("https://cafe-tero.onrender.com/categories",{
        category_name: name
    })
    .then((data)=>{
        return data.data
    }).catch((err)=>{
        console.error("there was an error:", err)
    })

}

export const createProduct = (productData) =>{
    return axios.post("https://cafe-tero.onrender.com/products",{
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        image_url: productData.image_url,
        description: productData.description,
        category_id: productData.category_id,
    }) .then((data)=>{
        return data.data
    }).catch((err)=>{
        console.error("there was an error:", err)
    })
}
export const updateProduct = (id, productData)=>{
    return axios.put(`https://cafe-tero.onrender.com/products/${id}`,{
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        image_url: productData.image_url,
        description: productData.description,
        category_id: productData.category_id,
    })
    .then((data)=>{
        return data.data
    }).catch((err)=>{
        console.error("there was an error:", err)
    })
}

export const getProductById = (id) =>{
    return axios.get(`https://cafe-tero.onrender.com/products/${id}`)
    .then((data)=>{
        console.log(data)
        return data.data
    }) .catch((err)=>{
        console.error("there was an error:", err)
    })

}

export const checkout = (customerData, currentBasket, totalPrice) =>{
    return axios.post("https://cafe-tero.onrender.com/checkout",{
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
export const login = (email, password) => {
        return axios.post("https://cafe-tero.onrender.com/login/auth", {
        email,
        password,
      })
      .then((data)=>{
        console.log("success")
        console.log(data.data.user.name)
        return data.data
      }).catch((err)=>{
        console.log("fail", err)
        console.error("there was an error:", err)
    })
}

