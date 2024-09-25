import React, { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
import RoomPage from "./Pages/RoomPage";
import { auth } from "./firebase";
import ChatPage from "./Pages/ChatPage";

const App = () => {
  console.log(auth.currentUser);

  // kullanıcının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token") || false);

  // kullanıcının girmek istediği odanın state'i
  const [room, setRoom] = useState(localStorage.getItem("room") || null);

  // `room` state'i değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (room) {
      localStorage.setItem("room", room);
    } else {
      localStorage.removeItem("room");
    }
  }, [room]);

  // yetkisi yoksa LoginPage'i ekrana bas
  if (!isAuth) return <LoginPage setIsAuth={setIsAuth} />;

  // yetkisi varsa  RoomPage'i ekrana bas
  return (
    <div className="container">
      {room || !isAuth ? (
        // oda seçildiyse: sohbet sayfası
        <ChatPage setRoom={setRoom} room={room} setIsAuth={setIsAuth} />
      ) : (
        // oda seçilmediyse: oda seçme sayfası
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      )}
    </div>
  );
};

export default App;
