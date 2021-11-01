const js2xmlparser = require("js2xmlparser");

exports.sendJsonResponse = (req, res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
exports.sendXmlResponse = (req, res, statusCode, data) => {
    return res.status(statusCode).send(js2xmlparser.parse("data", data));
};
