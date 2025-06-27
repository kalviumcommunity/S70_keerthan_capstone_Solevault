import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LiveCommentFeed = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        // Connect to the WebSocket server when the component mounts
        // NOTE: In production, you'd use 'wss://' for a secure connection
        // For Render.com, you need to use your specific '.onrender.com' address
        const wsUrl = import.meta.env.VITE_WEBSOCKET_URL; // Use your backend's WebSocket URL
        
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = event.data;
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Cleanup function: close the connection when the component unmounts
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []); // The empty dependency array ensures this runs only once

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(newMessage);
            setNewMessage(''); // Clear the input field
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-[#1c1c1c]">
            <h3 className="text-lg font-semibold mb-4">Live Comments</h3>
            <div className="h-48 overflow-y-auto border border-neutral-700 rounded-md p-2 mb-4 space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} className="bg-neutral-800 p-2 rounded-md text-sm">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Add a comment..."
                    className="bg-[#262626] border-neutral-600 text-white"
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
};

export default LiveCommentFeed;