import { NavLink, Outlet } from "react-router";
import AdminStyle from "../styles/AdminStyle";

function AdminPage() {
  return (
    <AdminStyle>
      <div className="mainContainerAdmin">
        {/* Navigation List */}
        <div className="listCont">
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
                <NavLink to="add-stock">Add Stock to an Existing Product</NavLink>
              </li>
              <li>
                <NavLink to="modify-products">Modify Existing Products</NavLink>
              </li>
            </ol>
          </nav>
        </div>

        {/* Render Area */}
        <div className="adminRenderCont">
          <Outlet /> {/* This renders the matched child route */}
        </div>
      </div>
    </AdminStyle>
  );
}

export default AdminPage;
