const Story = require('../models/storyModel');
const AppError = require('../errors/appError');

exports.createStory = async (storyBody) => {
    const story = await Story.create(storyBody);
    return story;
};

exports.getStory = async (storyId) => {
    const story = await Story.findOne({ where: { id: storyId } });
    if (!story) throw new AppError(`Story not found`, 404);
    return story;
};

exports.getStories = async (req, res, next) => {
    const stories = await Story.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    });
    if (stories[0] == null) throw new AppError(`No story found`, 404);
    return stories;
};

exports.updateStory = async (storyId, updateBody) => {
    storyUpdated = await Story.update(updateBody, { returning: true, where: { id: storyId } });
    if (!storyUpdated[0])
        throw new AppError(`Story not found`, 404);
    return storyUpdated[1][0];
};

exports.deleteStory = async (storyId) => {
    const storyDeleted = await Story.destroy({ where: { id: storyId } });
    if (!storyDeleted)
        throw new AppError(`Story not found`, 404);
    return;
};