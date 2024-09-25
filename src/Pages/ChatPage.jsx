import React from "react";
import { auth } from "../firebase";

const ChatPage = ({ setIsAuth, setRoom, room }) => {
  // todo mesajı veritabanına kaydet
  return (
    <div className="chat-page">
      <header>
        <p className="capitalize">{auth?.currentUser?.displayName}</p>
        <div className="down">
          <p className="capitalize">{room}</p>
          <p>&#9660;</p>
        </div>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>x</main>

      <form className="message-form">
        <input type="text" placeholder="Mesajınızı yazınız..." />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
