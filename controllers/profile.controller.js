const userModel = require("../models/user.model");

exports.getProfile = (req, res, next) => {
    let id = req.params.id;
    if (!id) return res.redirect('/profile/' + req.session.userId);
    userModel
        .getUserData(id)
        .then((data) => {
            res.render('profile', {
                pageTitle: data.username,
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                myId: req.session.userId,
                myName: req.session.name,
                myImage: req.session.image,
                friendId: data._id,
                username: data.username,
                userImage: data.image,
                isOwner: id === req.session.userId,
                isFriends: data.friends.find(friend => friend.id === req.session.userId),
                isRequestSent: data.friendRequests.find(friend => friend.id === req.session.userId),
                isRequestRecieved: data.sentRequests.find(friend => friend.id === req.session.userId),
                
            })
        })
        .catch(error => { res.redirect('/error') });
};