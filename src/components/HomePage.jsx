import coffee from "../assets/coffeeBeans.mp4"
import HomePageStyle from "../styles/HomePageStyle"
export default function HomePage() {
  return (
    <HomePageStyle>
    <div className="firstDiv">
  <video className="coffeeVideo" autoPlay muted loop >
      <source src={coffee} type="video/mp4"/>
     </video>   
     
     <h1>Delight yourself with a world of flavours</h1>
     <h3>From Colombia, previously unexplored</h3>
    <button className="homeButton">SHOP NOW</button>
    
      </div>

      </HomePageStyle>
  )
}
