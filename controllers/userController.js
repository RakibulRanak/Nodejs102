const catchAsync = require('../errors/catchAsync');
const { sendResponse } = require("../utils/sendResponse");
const { UserService } = require('../services/userService');
const { PgUserDao } = require('../data/dao/userDao/pgUserDao');
const userService = new UserService(new PgUserDao());
exports.userService = userService;


exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        sendResponse(req, res, 201, user, 'User Created Successfully');
    } catch (err) { next(err) };
};

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await userService.getUser(req.params.username);
    sendResponse(req, res, 200, user, 'User fetched successfully')
});

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getUsers(req);
    sendResponse(req, res, 200, users, 'Stories fetched successfully')
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const userUpdated = await userService.updateUser(req);
    sendResponse(req, res, 200, userUpdated, 'User updated successfully')
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await userService.deleteUser(req);
    res.status(204).send();
});

exports.loginUser = async (req, res, next) => {
    try {
        const user = await userService.loginUser(req, res);
        sendResponse(req, res, 200, user, 'User looged In successfully')
    } catch (err) { next(err) }
};

exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    sendResponse(req, res, 200, null, 'User looged Out successfully',)

});
exports.changeUserPassword = catchAsync(async (req, res, next) => {
    const user = await userService.changeUserPassword(req, res);
    sendResponse(req, res, 200, user, 'Password changed successfully')

});
