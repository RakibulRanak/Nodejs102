const catchAsync = require('../errors/catchAsync');
const storyService = require('../services/storyService');
const { sendJsonResponse, sendXmlResponse } = require("../utils/sendResponse");


exports.createStory = catchAsync(async (req, res, next) => {
    const story = await storyService.createStory(req.body);
    res.format({
        'default': () => sendJsonResponse(req, res, 201, 'success', 'Story created successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 201, story)
    });
});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await storyService.getStory(req.params.id);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Story fetched successfully', story),
        'application/xml': () => sendXmlResponse(req, res, 200, story),
    });

});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await storyService.getStories();
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Stories fetched successfully', stories),
        'application/xml': () => sendXmlResponse(req, res, 200, stories),
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const storyUpdated = await storyService.updateStory(req.params.id, req.body);
    res.format({
        'default': () => sendJsonResponse(req, res, 200, 'success', 'Story updated successfully', storyUpdated),
        'application/xml': () => sendXmlResponse(req, res, 200, storyUpdated),
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await storyService.deleteStory(req.params.id);
    res.status(204).send();
});



