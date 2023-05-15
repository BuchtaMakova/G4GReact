import Login from "./Login.jsx";
import { Button } from "react-bootstrap";
import Auth from "./Auth.jsx";
import { useNavigate } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
export default function (props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/profile");
  }
  function userLogout() {
    props.setLogout();
  }
  if (props.logged) {
    return (
      <div>
        <Button className="float-end rounded-pill ms-3" onClick={userLogout}>
          Logout
        </Button>
        <Button className="float-end rounded-pill " onClick={handleClick}>
          Profil
        </Button>
        <div className="float-end mt-2 me-2" style={{ color: "white" }}>
          Welcome {props.account.username}
        </div>
      </div>
    );
  }
  return (
    <Auth
      setAccount={props.setAccount}
      setLogged={props.setLogged}
      error={props.error}
      notError={props.notError}
      logged={props.logged}
      refetch={props.refetch}
    />
  );
}
