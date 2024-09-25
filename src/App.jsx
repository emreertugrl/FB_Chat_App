import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import RoomPage from "./Pages/RoomPage";

const App = () => {
  // kullanıcının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token") || false);

  // yetkisi yoksa LoginPage'i ekrana bas
  if (!isAuth) return <LoginPage setIsAuth={setIsAuth} />;

  // yetkisi varsa  RoomPage'i ekrana bas
  return (
    <div className="container">
      <RoomPage />
    </div>
  );
};

export default App;
