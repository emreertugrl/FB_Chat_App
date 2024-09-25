import React from "react";

const RoomPage = () => {
  return (
    <div className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz ?</p>

      <input type="text" placeholder="ör:haftasonu" required />

      <button>Odaya Gir</button>
      <button>Çıkış Yap</button>
    </div>
  );
};

export default RoomPage;
