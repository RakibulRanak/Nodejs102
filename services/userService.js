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

    getStories = async (req) => {
        const users = await this.userDao.getStories(req);
        return users;
    };
    updateUser = async (userName, updateBody) => {
        const userUpdated = await this.userDao.updateUser(userName, updateBody);
        return userUpdated;
    };

    deleteUser = async (userId) => {
        const userDeleted = await this.userDao.deleteUser(userName);
        return;
    };
}

module.exports = { UserService };

