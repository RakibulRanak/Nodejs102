const catchAsync = require('../errors/catchAsync');
const { sendResponse } = require("../utils/sendResponse");
const { StoryService } = require('../services/storyService');
const { PgStoryDao } = require('../data/dao/storyDao/pgStoryDao');
const storyService = new StoryService(new PgStoryDao());
;

exports.createStory = catchAsync(async (req, res, next) => {
    const story = await storyService.createStory(req);
    sendResponse(req, res, 201, story, 'Story created successfully')

});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await storyService.getStory(req.params.id);
    sendResponse(req, res, 200, story, 'Story fetched successfully')

});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await storyService.getStories(req);
    sendResponse(req, res, 200, stories, 'Stories fetched successfully')
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const storyUpdated = await storyService.updateStory(req);
    sendResponse(req, res, 200, storyUpdated, 'Story updated successfully')


});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await storyService.deleteStory(req);
    res.status(204).send();
});



