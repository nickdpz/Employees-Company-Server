const storeUser = require('./store');

const isUserName = async (userName) => {
    const section = 'UsersController | isUserName';

    if (!userName) {
        throw (new Error('Informacion Incorrecta'));
    }
    const filter = {
        userName: userName
    };
    try {
        const flag = await storeUser.isUserFeat(filter);

        console.info(`${section} with flag ${flag} ends succesfuly`);

        return (flag);

    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const isEmail = async (email) => {
    const section = 'UsersController | isEmail';

    if (!email) {
        throw (new Error('Informacion Incorrecta'));
    }
    const filter = {
        email: email
    };
    try {
        const flag = await storeUser.isUserFeat(filter);
        console.info(`${section} with flag ${flag} ends succesfuly`);

        return (flag);

    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};


const addUser = async (userName, name, lastName, email, password, phone, role, companyId) => {
    const section = 'UsersController | addUser';
    try {
        return await storeUser.addUser({ userName, name, lastName, email, password, phone, role, companyId }); // add user
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const listUsers = async (filterUser) => (storeUser.listUsers(filterUser));

const getUser = async (filterUser) => {
    const section = 'UsersController | getUser';
    try {
        return await storeUser.getUser(filterUser);
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const searchUsers = async (keyword, role = 'employee') => {
    const section = 'UsersController | searchUsers';

    try {
        const messages = await storeUser.listUsers({
            $and: [{
                $or: [
                    { userName: { $regex: new RegExp(keyword) } },
                    { name: { $regex: new RegExp(keyword) } },
                    { lastName: { $regex: new RegExp(keyword) } }
                ]
            }, {
                role: role
            }]

        });
        console.info(`${section} with ends succesfuly with ${JSON.stringify(messages)}`);

        return (messages);

    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const updateUser = async (id, email, phone) => {
    const section = 'UsersController | updateUser';

    try {
        const result = await storeUser.updateUser(id, null, email, phone);
        if (result) return ('ok');
        throw { code: 400, message: 'bad id' };
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

const deleteUser = async (id) => {
    const section = 'UsersController | deleteUser';

    try {
        if (process.env.NODE_ENV === 'test') {
            await storeUser.deleteUserDefinitive(id);
        } else {
            await storeUser.deleteUser(id);
        }
        console.info(`${section} with ends succesfuly`);

        return ('ok');
    } catch (e) {
        console.error(`ends ${section} with error ${e}`);
        throw (e);
    }
};

module.exports = {
    isUserName,
    isEmail,
    addUser,
    listUsers,
    updateUser,
    deleteUser,
    getUser,
    searchUsers,
};