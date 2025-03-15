import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(""); 
  const [joined, setJoined] = useState(false); 
  const wsRef = useRef();
  const inputRef = useRef();
  const roomRef = useRef();

  useEffect(() => {
    if (!joined) return; 

    const ws = new WebSocket("ws://localhost:8080"); 
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, [joined]); 

  const handleJoinRoom = () => {
    const enteredRoom = roomRef.current?.value.trim();
    if (enteredRoom) {
      setRoomId(enteredRoom);
      setJoined(true);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {!joined ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <input
            ref={roomRef}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none w-64 text-center"
            placeholder="Enter Room Name..."
          />
          <button
            onClick={handleJoinRoom}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-white font-semibold"
          >
            Create/Join Room
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex justify-start">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md">
                  {message}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-800 p-4 flex items-center">
            <input
              ref={inputRef}
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={() => {
                const message = inputRef.current?.value.trim();
                if (message) {
                  wsRef.current.send(
                    JSON.stringify({
                      type: "chat",
                      payload: {
                        message: message,
                        roomId: roomId,
                      },
                    })
                  );
                  inputRef.current.value = "";
                }
              }}
              className="ml-4 bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-white font-semibold"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
