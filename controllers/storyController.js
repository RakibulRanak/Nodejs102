const catchAsync = require('../errors/catchAsync');
const Story = require('../models/storyModel');
const AppError = require('../errors/appError');

exports.createStory = catchAsync(async (req, res, next) => {
    const story = await Story.create(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Story is created successfully',
        story
    });
});



exports.getStory = catchAsync(async (req, res, next) => {
    const story = await Story.findOne({ where: { id: req.params.id } });
    if (story == null) {
        return next(new AppError(`Not found`, 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'Story fetched successfully',
        data: story
    });
});

exports.getStories = catchAsync(async (req, res, next) => {
    const stories = await Story.findAll();
    res.status(200).json({
        status: 'success',
        message: 'Stories fetched successfully',
        data: stories
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    story = await Story.update(req.body, { returning: true, where: { id: req.params.id } });
    res.status(200).json({
        status: 'success',
        message: 'Story updated successfully',
        data: story[1][0]
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    await Story.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
        if (rowDeleted) {
            res.status(200).json({
                status: 'success',
                message: "Successfully deleted"
            })
        }
        else {
            return next(new AppError(`Story not found`, 404));
        }
    });

});
