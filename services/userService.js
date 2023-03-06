const { createSetJwtToken } = require('../utils/createSetJwtToken')


class UserService {
    constructor(userDao) {
        this.userDao = userDao;
    }
    createUser = async (userBody) => {
        const user = await this.userDao.createUser(userBody);
        return user;
    };
    getUser = async (userName) => {
        const user = await this.userDao.getUser(userName);
        return user;
    };

    getUsers = async (req) => {
        const users = await this.userDao.getUsers(req);
        return users;
    };
    updateUser = async (req) => {
        const userUpdated = await this.userDao.updateUser(req);
        return userUpdated;
    };

    deleteUser = async (req) => {
        await this.userDao.deleteUser(req);
        return;
    };

    loginUser = async (req, res) => {
        const user = await this.userDao.loginUser(req.body);
        return createSetJwtToken(res, user);
        
    };

    changeUserPassword = async (req, res) => {
        const user = await this.userDao.changeUserPassword(req);
        createSetJwtToken(res, user);
        return user;
    }
}

module.exports = { UserService };

