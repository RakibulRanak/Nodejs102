const User = require('../../../models/userModel');
const AppError = require('../../../errors/appError');
const { UserDao } = require('./userDao');
const { UserDto } = require('../../dto/userDto')
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class PgUserDao extends UserDao {
    constructor() { super(); }
    createUser = async (userBody) => {
        const Op = Sequelize.Op;
        const { email, username, name, password } = userBody;
        let user = await User.findOne({
            where:
            {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });
        if (user)
            throw new AppError('Username or Email Already Exist!', 405);

        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(password, salt);
        user = await User.create({ username, name, email, password: hashedpassword });
        return new UserDto(user);
    };

    getUser = async (userName) => {
        const user = await User.findOne({ where: { username: userName } });
        if (!user) throw new AppError(`User not found`, 404);
        return new UserDto(user);
    };

    getUsers = async (req) => {
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
    updateUser = async (req) => {
        const { name, email } = req.body;
        const username = req.user.username;
        const userUpdated = await User.update({ name, email }, { returning: true, where: { username } });
        if (!userUpdated[0])
            throw new AppError(`User did not update`, 404);
        return new UserDto(userUpdated[1][0]);
    };

    deleteUser = async (req) => {
        const { password } = req.body;
        const username = req.user.username;
        const user = await User.findOne({
            where: {
                username
            }
        });
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            throw new AppError('Invalid Credential', 404);
        await User.destroy({ where: { username } });
        return;
    };

    loginUser = async (userBody) => {
        const { username, password } = userBody;
        const user = await User.findOne({
            where: {
                username
            }
        });
        if (user == null)
            throw new AppError('Invalid Credential', 404);
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            throw new AppError('Invalid Credential', 404);
        return new UserDto(user);
    }

    changeUserPassword = async (req) => {
        const username = req.user.username;
        const { newPassword, oldPassword } = req.body;
        const user = await User.findOne({
            where: {
                username
            }
        });
        const validPass = await bcrypt.compare(oldPassword, user.password);
        if (!validPass)
            throw new AppError('Invalid Credential', 404);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        const updatedUser = await User.update({ password }, { returning: true, where: { username } });
        return new UserDto(updatedUser[1][0]);
    }


}
module.exports = { PgUserDao };