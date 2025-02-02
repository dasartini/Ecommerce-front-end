import HeaderStyle from "../styles/HeaderStyle";
import logo from "../assets/logo.png"
import basket from "../assets/basket.svg"
import { Link } from "react-router";
import { useBasketContext } from "../contexts/BasketContext";

export default function Header() {
  const {quantity} = useBasketContext()
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
   <Link to={"/basket"}>
   <div className="shoppingBasket">
<img className="basket" src={basket}/> {quantity}
   </div>
   </Link>
   </div>
    </header>
    </HeaderStyle>
  )
  
}
