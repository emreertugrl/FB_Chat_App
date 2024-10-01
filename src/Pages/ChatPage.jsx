import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ setRoom, room }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // son mesajın referansı
  const lastMsg = useRef();
  //  mesajı veritabanına kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    // emoji kapat
    setIsOpen(false);
    // mesaj inputu temizle
    setText("");
    // mesaj boş mu
    if (!text.trim()) return;

    // mesaj document'inin kaydedileceğikolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // referansı alınan kolleksiyona document'i ekleme
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    // abone olunacak koleksiyonun referansını al
    const messagesCol = collection(db, "messages");
    // sorgu ayalarını yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // anlık olarak koleksiyondaki verileri izler ve her değişimde callback tetikler
    // parametre olarak koleksiyondaki veriyi alır.
    const unsub = onSnapshot(q, (data) => {
      let temp = [];
      // data(): dökümanın içerisindeki veriye erişmemizi sağlar.
      data.docs.forEach((doc) => temp.push(doc.data()));
      // mesajları state'e aktarır
      setMessages(temp);
    });

    // kullanıcı sayfadan ayrılınca aboneliği durdur
    return () => unsub();
  }, []);
  // her yeni mesaj eklendiğinde
  useEffect(() => {
    // ekrana son mesaj gelene kadar kaydır
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messages);
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

      <main>
        {messages.length < 1 ? (
          <div className="warning">
            <p>Sohbete ilk mesajı gönderin.</p>
          </div>
        ) : (
          messages.map((data, key) => <Message key={key} data={data} />)
        )}

        <div ref={lastMsg} />
      </main>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Mesajınızı yazınız..."
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => setText(text + e.emoji)}
            open={isOpen}
            skinTonePickerLocation="PREVIEW"
          />
          <button onClick={() => setIsOpen(!isOpen)} type="button">
            😉
          </button>
        </div>

        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
