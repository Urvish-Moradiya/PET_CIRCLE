import React from 'react';

const Messages = ({ messages, selectedChat, setSelectedChat, messageInput, setMessageInput }) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Messages</h2>
        <div className="bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-3 h-[600px]">
            <div className="border-r">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
              <div className="overflow-y-auto h-[calc(600px-68px)]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedChat(msg.senderId)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat === msg.senderId ? 'bg-fuchsia-50' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src="https://public.readdy.ai/ai/img_res/41bbee690754b040535d0ba79537e2b5.jpg" alt="User" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-gray-500 truncate">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img src="https://public.readdy.ai/ai/img_res/85be3c02f87a8e22cd9e9e64fa082f2e.jpg" alt="User" className="w-10 h-10 rounded-full" />
                  <h4 className="font-semibold">John Doe</h4>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === 1 ? 'bg-fuchsia-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                  <button className="!rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;