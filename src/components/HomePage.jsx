import HomePageStyle from "../styles/HomePageStyle"
import Design from "./Design"
import farmer2 from "../assets/farmer.jpg"
import { useEffect, useState } from "react"
import { allProducts } from "../../api"
import { Link } from "react-router"
export default function HomePage() {
  const[products, setProducts] = useState([])

  const getRandomProducts = (arr, count) => {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, count);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  useEffect(()=>{
    allProducts()
    .then((data)=>{
      const randomProducts = getRandomProducts(data,3)
      setProducts(randomProducts)
    })
  },[])
  return (
    <HomePageStyle>
     <Design/>
      <div className="hero">


    <div className="secondCont">
<img className="farmer2" src={farmer2}/>
      <div className="homeText">
     <h1> Amazing artisanian coffee roast</h1>
     <br></br>
<p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quis eum assumenda ullam officiis sequi minima reiciendis quo dignissimos ducimus, laudantium aliquid veritatis. Ex, enim aliquid. Dolore aperiam explicabo asperiores?</p>

</div>
    </div>
   
<div className="thirdCont">
  <div className="thirdContText">
  <h1>Interested in partnering with us?</h1>
  <p>Get tero into your business</p>
  <Link to={"/contact"}><button className="homeButton"> More information</button></Link>
  </div>
</div>

   <div className="fourthCont">
    <h1> Featured products:</h1>
 <div className="homeProductsCont">

  
 {products.map(product => (
            <Link key={product.id} to={`/shop/${product.id}`}>
  
            <div key={product.id} className="homeProduct-card">
              <h2>{product.name}</h2>
              <p>from: £{product.price}</p>
              <img src={product.image_url} alt={product.name} />
            </div>
            </Link>
          ))}
</div>
 </div>


      </div>
      </HomePageStyle>
  )
}
