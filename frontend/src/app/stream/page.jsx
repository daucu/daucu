"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/stream', {
                    headers: {
                        Authorization: `Bearer your_token_here`
                    },
                    responseType: 'stream'
                });

                const reader = response.data.getReader();
                const decoder = new TextDecoder('utf-8');

                const read = async () => {
                    let buffer = '';
                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });
                        let parts = buffer.split('\n\n');
                        buffer = parts.pop(); // Save any incomplete part back to the buffer

                        parts.forEach(part => {
                            console.log('Received part:', part); // Debugging log
                            if (part.startsWith('data: ')) {
                                const text = part.substring(6).trim();
                                console.log('Parsed message:', text); // Debugging log
                                setMessages(prevMessages => [...prevMessages, text]);
                            }
                        });
                    }
                };

                read();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Server-Sent Events</h1>
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}

export default App;
