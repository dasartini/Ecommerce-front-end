import axios from "axios";
const API = import.meta.env.VITE_API_URL

export const allProducts = () =>{

    return axios.get(`${API}/products`)
    .then((data)=>{
       return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const getCategories = () =>{

    return axios.get(`${API}/categories`)
    .then((data)=>{
        return data.data
    })
    .catch((err)=>{
        console.error(err)
    })

}

export const createCategory = (name)=>{ 
    return axios.post(`${API}/categories`,{
        category_name: name
    })
    .then((data)=>{
        return data.data
    }).catch((err)=>{
        console.error("there was an error:", err)
    })

}

export const createProduct = (productData) =>{
    return axios.post(`${API}/products`,{
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
    return axios.put(`${API}/products/${id}`,{
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        image_url: productData.image_url,
        description: productData.description,
        category_id: productData.category_id,
        isCoffee: productData.isCoffee,
        details: { Region: productData.details.Region,
            Altitude: productData.details.Altitude,
            Variety: productData.details.Variety,
            "Flavour notes": productData.details["Flavour notes"]

        }
    })
    .then((data)=>{
        return data.data
    }).catch((err)=>{
        console.error("there was an error:", err)
    })
}

export const getProductById = (id) =>{
    return axios.get(`${API}/products/${id}`)
    .then((data)=>{
        return data.data
    }) .catch((err)=>{
        console.error("there was an error:", err)
    })

}

export const checkout = (customerData, currentBasket, totalPrice) =>{
    currentBasket.forEach(element => {
        if(element.size === "500g"){ 
            element.quantity = 2
            element.size = "250g"
        }
        else if(element.size === "1kg"){ 
            element.quantity = 4
            element.size = "250g"
        }
    });
    return axios.post(`${API}/checkout`,{
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
        return axios.post(`${API}/login/auth`, {
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

