import { auth, provider } from "./../firebase";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const LoginPage = ({ setIsAuth }) => {
  // const [user, setUser] = useState(null);
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        // setUser(res.user);

        // kullanıcı google ile girdi mi
        setIsAuth(true);

        // sayfa yenilenince token localde saklanır.
        localStorage.setItem("token", res.user.refreshToken);
      })
      .catch((err) => console.log(res));
  };
  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>

        <button onClick={handleClick}>
          <img src="g-logo.png" alt="google logo" width={30} />
          <span>Google İle Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
