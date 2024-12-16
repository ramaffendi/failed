import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
// import variables from "../Style/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Style/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../Pages/Redux/State";
import logoImage from "../assets/logo.png";

export const NavigationBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  //   const navigate = useNavigate();

  return (
    <div className="navbar">
      <a href="/">
        <img src={logoImage} alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search sx={{ color: "#ff3366" }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "#333333" }} />
          {!user ? (
            <Person sx={{ color: "#333333" }} />
          ) : (
            <img
              src={`http://localhost:5000/${user.profileImagePath.replace(
                "Public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/createListing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
