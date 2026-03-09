const mongoose = require('mongoose');
const User = require('./server/models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/carrental');
        const users = await User.find({});
        console.log("Current Users in DB:", JSON.stringify(users, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
};

checkUsers();
