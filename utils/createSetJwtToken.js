const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createSetJwtToken = (res, user) => {
    const payload = {
        user: user.username
    };
    const jwtToken = jwt.sign(payload, process.env.jwtSecret, { expiresIn: process.env.jwtSessionTokenExpire });
    res.cookie('jwt', jwtToken, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        httpOnly: true

    });
    if (process.env.NODE_ENV === 'prooooductin')
        cookieOptions.secure = true;
    return;
};