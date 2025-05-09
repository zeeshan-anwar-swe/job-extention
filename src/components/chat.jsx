import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../context/authContext";






export const Chat = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const {userTokenStorage} = useAuth();


  const socket = io(BASE_URL, {
    auth: {
      token: token || "",
    },
  });




  const [currentUserId, setCurrentUserId] = useState("");
  // get the other user id from the param
  const [otherUserId, setOtherUserId] = useState("");
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // get current user id from the user object replace this logic with that
    const decoded = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(decoded.sub);

    const storedOther = localStorage.getItem("receiverId");
    if (storedOther) {
      setOtherUserId(storedOther);
    }
  }, []);

  useEffect(() => {
    if (!token || !currentUserId) return;

    socket.on("receive_message", (message) => {
      if (
        (message.senderId === otherUserId &&
          message.receiverId === currentUserId) ||
        (message.senderId === currentUserId &&
          message.receiverId === otherUserId)
      ) {
        setChat((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUserId, otherUserId]);

  useEffect(() => {
    if (!token || !otherUserId) return;

    axios
      .get(`http://localhost:3000/chat/messages/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setChat(res.data.data))
      .catch((err) => console.error(err));
  }, [otherUserId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const sendMessage = async () => {
    if (!file && !text.trim()) return;

    let mediaUrl = null;
    let mediaType = "none";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("receiverId", otherUserId);
      formData.append("text", text.trim());

      try {
        const res = await axios.post(
          "http://localhost:3000/chat/messages/send",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        mediaUrl = res.data.data.mediaUrl;
        mediaType = res.data.data.mediaType;
      } catch (err) {
        console.error("Upload failed", err);
        return;
      }
    }

    const message = {
      receiverId: otherUserId,
      text: text.trim(),
      mediaUrl,
      mediaType,
    };

    socket.emit("send_message", message);

    setChat((prev) => [
      ...prev,
      {
        ...message,
        senderId: currentUserId,
        createdAt: new Date().toISOString(),
      },
    ]);

    setText("");
    setFile(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>
        Chat: You ({currentUserId}) → {otherUserId}
      </h3>

      <div
        style={{
          height: 300,
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.senderId === currentUserId ? "right" : "left",
              marginBottom: 5,
            }}
          >
            <strong>{msg.senderId === currentUserId ? "You" : "Them"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%" }}
        />
        <input type="file" onChange={handleFileChange} />
      </div>

      <button onClick={sendMessage} style={{ width: "18%", marginLeft: "2%" }}>
        Send
      </button>
    </div>
  );
};
