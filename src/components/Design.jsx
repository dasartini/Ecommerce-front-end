import React from 'react'
import coffee from "../assets/coffeeBeans.mp4"
import { Link } from "react-router"


export default function Design() {
  return (
    <div className="firstDiv">
    <video className="coffeeVideo" autoPlay muted loop >
        <source src={coffee} type="video/mp4"/>
       </video>   
       
       <h1>Delight yourself with a world of flavours</h1>
       <h3>From Colombia, previously unexplored</h3>
     <Link to="/shop"> <button className="homeButton">SHOP NOW</button>
     </Link>
        </div>
  )
}
