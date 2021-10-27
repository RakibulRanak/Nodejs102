const User = require('../../../models/userModel');
const AppError = require('../../../errors/appError');
const { UserDao } = require('./userDao');
const { UserDto } = require('../../dto/userDto')


class PgUserDao extends UserDao {
    constructor() { super(); }
    createUser = async (userBody) => {
        const user = await User.create(userBody);
        return new UserDto(user);
    };
    getUser = async (userName) => {
        const user = await User.findOne({ where: { username: userName } });
        if (!user) throw new AppError(`User not found`, 404);
        return new UserDto(user);
    };

    getStories = async (req) => {
        let { page, size } = req.query;
        if (!page)
            page = 1;
        if (!size)
            size = 10;
        const limit = parseInt(size);
        const skip = limit * (parseInt(page) - 1);
        const users = await User.findAll({ limit, offset: skip, order: [['createdAt', 'DESC']] });
        if (users[0] == null) throw new AppError(`No user found`, 404);
        let userArray = [];
        for (let i = 0; i < users.length; i++) {
            userArray[i] = new UserDto(users[i]);
        }
        return userArray;
    };
    updateUser = async (userName, updateBody) => {
        const userUpdated = await User.update(updateBody, { returning: true, where: { username: userName } });
        if (!userUpdated[0])
            throw new AppError(`User not found`, 404);
        return new UserDto(userUpdated[1][0]);
    };

    deleteUser = async (userName) => {
        const userDeleted = await User.destroy({ where: { userName: userName } });
        if (!userDeleted)
            throw new AppError(`User not found`, 404);
        return;
    };


}
module.exports = { PgUserDao };