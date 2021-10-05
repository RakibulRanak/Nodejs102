const catchAsync = require('../errors/catchAsync');
const Story = require('../models/storyModel');
const AppError = require('../errors/appError');
const js2xmlparser = require("js2xmlparser");

const sendJsonResponse = (req, res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
const sendXmlResponse = (req, res, statusCode, data) => {
    return res.status(statusCode).send(js2xmlparser.parse("data", data));
};

const sendDefaultResponse = (req, res, statusCode) => {
    return res.status(statusCode).send(`<html>
                <body>
                    accept content-type doesn't match any    
                </body>
        </html>`
    );
};

exports.createStory = catchAsync(async (req, res, next) => {
    let story;
    await Story.create(req.body).then((resultEntity) => {
        story = resultEntity.get({ plain: true })
    });
    res.format({
        'application/json': () => sendJsonResponse(req, res, 201, 'success', 'Story created successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 201, story),
        'default': () => sendDefaultResponse(req, res, 201)
    });
});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await Story.findOne({
        raw: true,
        where: { id: req.params.id }, attributes: ['id', 'title', 'story', ['username', 'author'], 'createdAt']
    });
    if (story == null) {
        return next(new AppError(`Not found`, 404));
    }
    res.format({
        'application/json': () => sendJsonResponse(req, res, 200, 'success', 'Story fetched successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 200, story),
        'default': () => sendDefaultResponse(req, res, 200)
    });

});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await Story.findAll({ raw: true, attributes: ['id', 'title', 'story', ['username', 'author'], 'createdAt'] });
    res.format({
        'application/json': () => sendJsonResponse(req, res, 200, 'success', 'Stories fetched successfully', stories),
        'application/xml': () => sendXmlResponse(req, res, 200, stories),
        'default': () => sendDefaultResponse(req, res, 200)
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    story = await Story.update(req.body, { raw: true, returning: true, where: { id: req.params.id } });
    res.format({
        'application/json': () => sendJsonResponse(req, res, 200, 'success', 'Story updated successfully', story[1][0]),
        'application/xml': () => sendXmlResponse(req, res, 200, story[1][0]),
        'default': () => sendDefaultResponse(req, res, 200)
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await Story.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
        if (rowDeleted) {
            res.format({
                'application/json': () => sendJsonResponse(req, res, 200, 'success', 'Story deleted successfully', ''),
                'application/xml': () => sendXmlResponse(req, res, 200, 'story deleted successfully'),
                'default': () => sendDefaultResponse(req, res, 200)
            });
        }
        else {
            return next(new AppError(`Story not found`, 404));
        }
    });

});
