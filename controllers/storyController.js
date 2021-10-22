const catchAsync = require('../errors/catchAsync');
const { StoryService } = require('../services/storyService');
const { PgStoryDao } = require('../data/dao/pgStoryDao');
const storyService = new StoryService(new PgStoryDao());

exports.createStory = catchAsync(async (req, res, next) => {

    const story = await storyService.createStory(req.body)
    res.status(201).json({
        status: 'success',
        message: 'Story is created successfully',
        story
    });
});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await storyService.getStory(req.params.id);
    res.status(200).json({
        status: 'success',
        message: 'Story fetched successfully',
        data: story
    });
});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await storyService.getStories();
    res.status(200).json({
        status: 'success',
        message: 'Stories fetched successfully',
        data: stories
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const storyUpdated = await storyService.updateStory(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        message: 'Story updated successfully',
        data: storyUpdated
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await storyService.deleteStory(req.params.id);
    res.status(204).send();
});