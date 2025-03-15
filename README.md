# **Chat Room WebSocket Server**

A simple WebSocket-based chat room server built with **Node.js** and `ws`. This server allows multiple users to join chat rooms and send messages in real time.

---

## **🚀 Features**
✅ Users can join a specific chat room.  
✅ Messages are broadcast to all users in the same room.  
✅ Lightweight and efficient WebSocket implementation.  

---

## **📦 Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Pankajkantghz/chat-room.git
cd chat-room
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Server**
```sh
node server.js
```
The WebSocket server will start on **port 8080**.

---

## **📡 WebSocket API**

### **🔹 Join a Room**
To join a chat room, send this JSON message:  
```json
{
  "type": "join",
  "payload": {
    "roomId": "room1"
  }
}
```
📌 **Effect**: Adds the user to `room1`.

### **🔹 Send a Chat Message**
Send a message to all users in the same room:  
```json
{
  "type": "chat",
  "payload": {
    "message": "Hello, world!"
  }
}
```
📌 **Effect**: Broadcasts `"Hello, world!"` to all users in the room.

---

## **📝 Testing with WebSocket Client**

### **1️⃣ Install wscat**
```sh
npm install -g wscat
```

### **2️⃣ Connect to the Server**
```sh
wscat -c ws://localhost:8080
```

### **3️⃣ Join a Room**
```sh
{"type": "join", "payload": {"roomId": "room1"}}
```

### **4️⃣ Send a Message**
```sh
{"type": "chat", "payload": {"message": "Hello, everyone!"}}
```

---

## **📜 License**
This project is **MIT Licensed**. Feel free to use and modify it.

---

## **⭐ Support the Project**
If you like this project, consider **starring** ⭐ the repo on GitHub! 😊

