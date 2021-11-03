const catchAsync = require('../../errors/catchAsync');
const { sendJsonResponse, sendXmlResponse } = require("../../utils/sendResponse");

exports.getUser = catchAsync(async (req, res, next) => {
    const user = {
        username: 'testing',
        name: 'Rakibul',
        email: 'testing@gmail.com',
    }
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'User fetcheddd successfully', user),
        'application/xml': () => sendXmlResponse(req, res, 200, user),
    });

});

exports.createUser = catchAsync(async (req, res, next) => {

});

exports.getUsers = catchAsync(async (req, res, next) => {

});

exports.updateUser = catchAsync(async (req, res, next) => {

});

exports.deleteUser = catchAsync(async (req, res, next) => {

});

exports.loginUser = catchAsync(async (req, res, next) => {


});
exports.logoutUser = catchAsync(async (req, res, next) => {

});
exports.changeUserPassword = catchAsync(async (req, res, next) => {

});


