const catchAsync = require('../errors/catchAsync');
const { sendJsonResponse, sendXmlResponse } = require("../utils/sendResponse");
const { UserService } = require('../services/userService');
const { PgUserDao } = require('../data/dao/userDao/pgUserDao');
const { MgUserDao } = require('../data/dao/userDao/mgUserDao');
const userService = new UserService(new PgUserDao());
//const userService = new userService(new MgUserDao());


exports.createUser = catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body);
    res.format({
        'default': () => sendJsonResponse(req, res, 201, 'success', 'User created successfully', user),
        'application/xml': () => sendXmlResponse(req, res, 201, user),
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await userService.getUser(req.params.username);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'User fetched successfully', user),
        'application/xml': () => sendXmlResponse(req, res, 200, user),
    });

});

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getUsers(req);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Stories fetched successfully', users),
        'application/xml': () => sendXmlResponse(req, res, 200, users),

    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const userUpdated = await userService.updateUser(req);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'User updated successfully', userUpdated),
        'application/xml': () => sendXmlResponse(req, res, 200, userUpdated),
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await userService.deleteUser(req);
    res.status(204).send();
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const user = await userService.loginUser(req, res);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'User looged In successfully', user),
        'application/xml': () => sendXmlResponse(req, res, 200, user),
    });

});
exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'User looged Out successfully', null),
        'application/xml': () => sendXmlResponse(req, res, 200, null),
    });
});
exports.changeUserPassword = catchAsync(async (req, res, next) => {
    const user = await userService.changeUserPassword(req, res);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Password changed successfully', user),
        'application/xml': () => sendXmlResponse(req, res, 200, user),
    });

});
