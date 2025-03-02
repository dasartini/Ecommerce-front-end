import { useState } from "react";
import { NavLink, Outlet } from "react-router"; 
import AdminStyle from "../styles/AdminStyle";
import { X, Menu } from "lucide-react";

function AdminPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AdminStyle>
      <div className="mainContainerAdmin">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </div>

        <div className={`listCont ${isMenuOpen ? "show-menu" : ""}`}>
          <p>Controls:</p>
          <nav>
            <ol>
              <li>
                <NavLink to="create-category">Create Category</NavLink>
              </li>
              <li>
                <NavLink to="create-product">Create Products</NavLink>
              </li>
              <li>
                <NavLink to="orders">Orders</NavLink>
              </li>
              <li>
                <NavLink to="modify-products">Modify Existing Products</NavLink>
              </li>
            </ol>
          </nav>
        </div>

        <div className="adminRenderCont">
          <Outlet />
        </div>
      </div>
    </AdminStyle>
  );
}

export default AdminPage;