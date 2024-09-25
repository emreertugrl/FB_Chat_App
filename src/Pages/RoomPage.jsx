import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const RoomPage = ({ setIsAuth, setRoom }) => {
  // ! Çıkış yapınca
  const logOut = () => {
    // yetki state false yapılır
    setIsAuth(false);
    // local'deki tokeni sileriz
    localStorage.removeItem("token");
    // firebase bağlantısını kapat
    signOut(auth);
  };

  // ! Form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputtaki girdiyi almak
    const room = e.target[0].value.toLowerCase();

    // sohbet sayfasına yönlendir
    setRoom(room);
  };

  //
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz ?</p>

      <input type="text" placeholder="ör:haftasonu" required />

      <button type="submit">Odaya Gir</button>
      <button type="button" onClick={logOut}>
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
