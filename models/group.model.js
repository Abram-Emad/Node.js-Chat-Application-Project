const mongoose = require("mongoose");

const dbUrl = 'mongodb://localhost:27017/Chat-Application';

const groupSchema = mongoose.Schema({
    name: String,
    image: { type: String, default: "default-group-image.png" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
});

const Group = mongoose.model("group", groupSchema);

exports.createGroup = async data => {
    try {
        await mongoose.connect(dbUrl);
        let group = new Group(data);
        let groupData = await group.save();
        mongoose.disconnect();
        return groupData._id;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};

exports.getUserGroups = async userId => {
    try {
        await mongoose.connect(dbUrl);
        let groups = await Group.find({
            users: {
                $all: [userId]
            }
        });
        mongoose.disconnect();
        return groups;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};

exports.getGroupInfo = async groupId => {
    try {
        await mongoose.connect(dbUrl);
        let group = await Group.findById(groupId).populate({
            path: "users",
            model: "user",
            select: "username image"
        });
        mongoose.disconnect();
        return group;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};
