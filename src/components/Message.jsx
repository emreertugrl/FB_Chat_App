import { auth } from "../firebase";

const Message = ({ data }) => {
  // eğer mesajı oturumu açık kişi attıysa mesaj sağda

  if (auth.currentUser.uid === data.author.id) {
    return <div className="msg-user">{data.text}</div>;
  }

  //   farklı birisi attıysa solda olmalı
  return (
    <div className="msg-other">
      <div>
        <img src={data.author.photo} alt="profile" />
        <span>{data.author.name}</span>
      </div>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
