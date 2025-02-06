# Node.js Chat Application

A real-time chat application built with Node.js, Express, and Socket.IO. This project enables users to communicate instantly in a chat room, with features like username selection, real-time messaging, and user connection/disconnection notifications.

## Features

- **Real-Time Messaging**: Instant message delivery using WebSockets via Socket.IO.
- **User Connections**: Notifications when users join or leave the chat.
- **Username Support**: Users can enter a unique username before joining the chat.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Active User List**: Displays a list of currently connected users.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js (HTTP server)
  - Socket.IO (real-time bidirectional communication)
- **Frontend**:
  - HTML/CSS/JavaScript
  - Socket.IO Client (integration with the server)
- **Development Tools**:
  - NPM (package management)
  - Nodemon (auto-restart server during development)

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   bash
   git clone https://github.com/Abram-Emad/Node.js-Chat-Application-Project.git
   cd Node.js-Chat-Application-Project
   

2. **Install Dependencies**:
   bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies (if applicable)
   cd ../client
   npm install  # Skip if client uses static HTML/CSS/JS
   

3. **Start the Server**:
   bash
   cd server
   npm start  # Starts the server on port 3000 (default)
   

4. **Open the Client**:
   - Navigate to `client/index.html` in your browser (e.g., `http://localhost:3000`).
   - Enter a username and start chatting!

## Usage

1. **Join the Chat**:
   - Open the client in your browser.
   - Enter a username when prompted.

2. **Send Messages**:
   - Type a message in the input field and press **Enter** or click **Send**.

3. **User Notifications**:
   - When a user joins or leaves, the chat displays a system message.

4. **Active Users**:
   - The sidebar shows a list of currently connected users.

## Project Structure


- ├── server/
- │   ├── index.js          # Server entry point (Express + Socket.IO setup)
- │   ├── package.json      # Server dependencies and scripts
- ├── client/
- │   ├── index.html        # Chat interface
- │   ├── styles.css        # Styling for the chat UI
- │   └── script.js         # Client-side Socket.IO logic
- └── README.md


## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/new-feature`.
3. Commit changes: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Acknowledgments

- [Socket.IO Documentation](https://socket.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- Thanks to [Abram Emad](https://github.com/Abram-Emad) for creating the project.

---

**Happy Chatting!** 🚀
 
