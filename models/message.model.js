const mongoose = require("mongoose");
const dbUrl = 'mongodb://localhost:27017/Chat-Application';
const messageSchema = mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    timestamp: Number
});
const Message = mongoose.model("message", messageSchema);

exports.getMessages = async chatId => {
    try {
        await mongoose.connect(dbUrl);
        let messages = await Message.find({ chat: chatId }, null, {
            sort: {
                timestamp: 1
            }
        }).populate({
            path: "chat", // field
            model: "chat", // model
            populate: {
                path: "users",
                model: "user",
                select: "username image"
            }
        });
        mongoose.disconnect();
        return messages;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};

exports.newMessage = async msg => {
    try {
        await mongoose.connect(dbUrl);
        msg.timestamp = Date.now();
        let newMsg = new Message(msg);
        await newMsg.save();
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};