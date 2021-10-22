const Story = require('../../models/storyModel');
const AppError = require('../../errors/appError');


class StoryDao {
    constructor() { }
    createStory = async (storyBody) => { };
    getStory = async (storyId) => { };
    getStories = async () => { };
    updateStory = async (storyId, updateBody) => { };
    deleteStory = async (storyId) => { };

}
module.exports = { StoryDao };