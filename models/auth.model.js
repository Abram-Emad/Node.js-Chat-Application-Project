// Require modules
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require("./user.model").User;

// Connection url
const dbUrl = 'mongodb://localhost:27017/Chat-Application';

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl)
            .then(() => { return User.findOne({ email: email }) })
            .then((user) => {
                if (user) {
                    mongoose.disconnect();
                    reject('email is used');
                }
                else {
                    return bcrypt.hash(password, 10)
                }
            })
            .then(hashedPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                })
                return user.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((error) => {
                mongoose.disconnect();
                reject(error)
            })
    })
};

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl)
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("There is no user saved in the database matches this email");
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect();
                            reject("password is incorrect");
                        } else {
                            mongoose.disconnect();
                            resolve(user);
                        }
                    });
                }
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
