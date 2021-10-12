const Story = require('../models/storyModel');
const AppError = require('../errors/appError');


class PgStoryService {
    createStory = async (storyBody) => {
        console.log("hi");
        const story = await Story.create(storyBody);
        return story;
    };
    getStory = async (storyId) => {
        const story = await Story.findOne({ where: { id: storyId } });
        if (!story) throw new AppError(`Story not found`, 404);
        return story;
    };

    getStories = async () => {
        const stories = await Story.findAll();
        if (stories[0] == null) throw new AppError(`No story found`, 404);
        return stories;
    };
    updateStory = async (storyId, updateBody) => {
        const storyUpdated = await Story.update(updateBody, { returning: true, where: { id: storyId } });
        if (!storyUpdated[0])
            throw new AppError(`Story not found`, 404);
        return storyUpdated[1][0];
    };

    deleteStory = async (storyId) => {
        const storyDeleted = await Story.destroy({ where: { id: storyId } });
        if (!storyDeleted)
            throw new AppError(`Story not found`, 404);
        return;
    };

}

module.exports = { PgStoryService };