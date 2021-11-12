const catchAsync = require('../errors/catchAsync');
const Story = require('../models/storyModel');
const AppError = require('../errors/appError');
const { sendJsonResponse, sendXmlResponse } = require("../utils/sendResponse");


console.log(typeof (sendJsonResponse))

exports.createStory = catchAsync(async (req, res, next) => {
    let story;
    await Story.create(req.body).then((resultEntity) => {
        story = resultEntity.get({ plain: true })
    });
    res.format({
        'default': () => sendJsonResponse(req, res, 201, 'success', 'Story created successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 201, story)
    });
});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await Story.findOne({
        where: { id: req.params.id }, attributes: ['id', 'title', 'story', ['username', 'author'], 'createdAt']
    });
    if (story == null) {
        return next(new AppError(`Not found`, 404));
    }
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Story fetched successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 200, story),
    });

});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await Story.findAll({ attributes: ['id', 'title', 'story', ['username', 'author'], 'createdAt'] });
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Stories fetched successfully', stories),
        'application/xml': () => sendXmlResponse(req, res, 200, stories),
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    story = await Story.update(req.body, { raw: true, returning: true, where: { id: req.params.id } })
    if (story[0]) {
        res.format({
            'default': () => sendJsonResponse(req, res, 200, 'success', 'Story updated successfully', story[1][0]),
            'application/xml': () => sendXmlResponse(req, res, 200, story[1][0]),
        });
    }
    else {
        return next(new AppError(`Story not found`, 404));
    }
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await Story.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
        if (rowDeleted) {
            res.format({
                'default': () => sendJsonResponse(req, res, 200, 'success', 'Story deleted successfully', ''),
                'application/xml': () => sendXmlResponse(req, res, 200, 'story deleted successfully'),
            });
        }
        else {
            return next(new AppError(`Story not found`, 404));
        }
    });

});
