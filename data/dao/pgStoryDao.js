const Story = require('../../models/storyModel');
const AppError = require('../../errors/appError');
const { StoryDao } = require('./storyDao');
const { StoryDto } = require('../dto/storyDto')


class PgStoryDao extends StoryDao {
    constructor() { super(); console.log("pg") }
    createStory = async (storyBody) => {
        const story = await Story.create(storyBody);
        return new StoryDto(story);
    };
    getStory = async (storyId) => {
        const story = await Story.findOne({ where: { id: storyId } });
        if (!story) throw new AppError(`Story not found`, 404);
        return new StoryDto(story);
    };

    getStories = async (req) => {
        let { page, size } = req.query;
        if (!page)
            page = 1;
        if (!size)
            size = 10;
        const limit = parseInt(size);
        const skip = limit * (parseInt(page) - 1);
        const stories = await Story.findAll({ limit, offset: skip, order: [['createdAt', 'DESC']] });
        if (stories[0] == null) throw new AppError(`No story found`, 404);

        let storyArray = [];
        for (let i = 0; i < stories.length; i++) {
            storyArray[i] = new StoryDto(stories[i]);
        }
        return storyArray;
    };
    updateStory = async (storyId, updateBody) => {
        const storyUpdated = await Story.update(updateBody, { returning: true, where: { id: storyId } });
        if (!storyUpdated[0])
            throw new AppError(`Story not found`, 404);
        return new StoryDto(storyUpdated[1][0]);
    };

    deleteStory = async (storyId) => {
        const storyDeleted = await Story.destroy({ where: { id: storyId } });
        if (!storyDeleted)
            throw new AppError(`Story not found`, 404);
        return;
    };


}
module.exports = { PgStoryDao };