const User = require('./modelUsers');

const addUser = async (newUser) => {
    const myUser = new User(newUser);
    const addUser = await myUser.save();
    addUser.password = undefined;
    delete addUser.password;
    return addUser;
};

const listUsers = async (filter) => {
    const users = await User.find({ ...filter, active: true }, { password: 0, date: 0 });
    return users;
};

const getUser = async (filter) => {
    const user = await User.findOne({ ...filter, active: true }, { password: 0, date: 0 });
    return user;
};

const getUserAuth = async (filter) => {
    const user = await User.findOne(filter);
    return user;
};

const updateUser = async (_id, role = undefined, email = undefined, phone = undefined) => {
    const foundUser = await User.findOne({ _id });
    if (foundUser) {
        if (role) foundUser.role = role;
        if (phone) foundUser.phone = phone;
        if (email) foundUser.email = email;
        await foundUser.save();
        return true;
    } else {
        return false;
    }
};

const deleteUser = async (id) => {
    const foundUser = await User.findOne({
        _id: id
    });
    foundUser.active = false;
    await foundUser.save();
};

const deleteUserDefinitive = (_id) => (User.deleteOne({ _id }));


const isUserFeat = async (filter) => {
    const user = await User.findOne(filter);
    if (user) {
        return true;
    }
    return false;
};

const updateManyUsers = async () => {
    await User.updateMany({}, { active: true });
};

module.exports = {
    addUser,
    listUsers,
    getUser,
    getUserAuth,
    updateUser,
    deleteUser,
    deleteUserDefinitive,
    isUserFeat,
    updateManyUsers,
};