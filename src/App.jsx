import "./App.css";
import Category from "./components/Category.jsx";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import Content from "./components/Content.jsx";
import { useEffect, useState } from "react";
import ContentDetail from "./components/ContentDetail.jsx";
import Auth from "./components/Auth.jsx";
import axios from "axios";
import authHeader from "./services/AuthHeader.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";

function App() {
  const [isLogged, setLog] = useState(false);
  const [subcatId, setSubcatId] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [category, setCat] = useState([]);
  function setCategory(param) {
    setCat(param);
  }

  let navigate = useNavigate();
  const [account, setAcc] = useState({});
  const [logged, setLogg] = useState(false);
  const [error] = useState("required");
  const [notError] = useState("");

  useEffect(() => {
    refetch();
  }, []);

  function refetch() {
    let jwt = localStorage.getItem("jwt");
    let username = localStorage.getItem("username");
    const API_URL = "https://localhost:7100/api/Users/ByUsername?name=";
    if (jwt != "" && username != "") {
      axios
        .get(API_URL + username, {
          headers: authHeader(),
        })
        .then((res) => {
          setAccount(res.data);

          if (!logged) {
            setLogged();
          }
        })
        .catch((res) => {
          if (res.response.status == 401) {
            setLogout();
          }
        });
    }
  }

  function setLogged() {
    setLogg(true);
  }

  function setLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setLogg(false);
  }

  function setAccount(param) {
    setAcc(param);
  }

  return (
    <div>
      <NavigationBar
        isLogged={isLogged}
        setLogged={setLogged}
        error={error}
        notError={notError}
        setAccount={setAccount}
        account={account}
        refetch={refetch}
        logged={logged}
        setLogout={setLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Category
              categories={categories}
              setCategories={setCategories}
              setCategory={setCategory}
              setSub={setSubcatId}
              sub={subcatId}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile account={account} setLogout={setLogout} />}
        />
        <Route
          path="SubCategory/:subcatId"
          element={
            <Content
              category={category}
              error={error}
              notError={notError}
              account={account}
              isLogged={isLogged}
              logged={logged}
              refetch={refetch}
              setSub={setSubcatId}
              sub={subcatId}
            />
          }
        />
        <Route
          path="Content/:contentId"
          element={
            <ContentDetail
              account={account}
              error={error}
              notError={notError}
              logged={logged}
              refetch={refetch}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              isLogged={isLogged}
              setLogged={setLogged}
              error={error}
              notError={notError}
              setAccount={setAccount}
              account={account}
              refetch={refetch}
              logged={logged}
              setLogout={setLogout}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
