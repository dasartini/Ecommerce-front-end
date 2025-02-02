import HeaderStyle from "../styles/HeaderStyle";
import logo from "../assets/logo.png"
import basket from "../assets/basket.svg"
import { Link } from "react-router";

export default function Header() {
  return (
    <HeaderStyle>
    <header>
        <div className="mainHeaderContainer">
   <div className="logoContainer">
    <img className="logo" src={logo}/>
    <div className="buttonsContainer">
   <Link to="/shop"> <p>Shop</p></Link>
<p>About</p>
<p>Contact</p>
    </div>

   </div>
   <div className="shoppingBasket">
<img className="basket" src={basket}/>
   </div>
   </div>
    </header>
    </HeaderStyle>
  )
  
}
