const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/Chat-Application';
const chatSchema = mongoose.Schema({
    users: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
});

const Chat = mongoose.model('chat', chatSchema);
exports.Chat = Chat;

exports.getChat = async chatId => {
    try {
        await mongoose.connect(dbUrl);
        let chat = await Chat.findById(chatId).populate('users');
        mongoose.disconnect();
        return chat;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};