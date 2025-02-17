import HeaderStyle from "../styles/HeaderStyle";
import logo from "../assets/logocolor.png";
import basket from "../assets/basket.svg";
import { Link } from "react-router";
import { useBasketContext } from "../contexts/BasketContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function Header() {
  const {authToken} = useAuthContext()
  const { quantity } = useBasketContext();

  return (
    <HeaderStyle>
      <header>
        <div className="mainHeaderContainer">
          <div className="centerSection">
            <img className="logo" src={logo} alt="Shop Logo" />
            <nav className="buttonsContainer">
              <Link to="/shop">
                <p>Shop</p>
              </Link>
             <Link to={"/"}> <p>About</p></Link>
              <p>Contact</p>
             {authToken &&  <Link to={"/admin"}> <p>Admin</p></Link> }

            </nav>
          </div>

        
            <Link to={"/basket"}>
              <div className="shoppingBasket">
                <img className="basket" src={basket} alt="Basket Icon" />
                <span className="basketQuantity">{quantity}</span>
              </div>
            </Link>
          
        </div>
      </header>
    </HeaderStyle>
  );
}
