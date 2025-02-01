import HeaderStyle from "../styles/HeaderStyle";
import logo from "../assets/logo.png"
import basket from "../assets/basket.svg"

export default function Header() {
  return (
    <HeaderStyle>
    <header>
        <div className="mainHeaderContainer">
   <div className="logoContainer">
    <img className="logo" src={logo}/>
    <div className="buttonsContainer">
    <p>Shop</p>
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
