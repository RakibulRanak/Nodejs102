const Story = require('../../models/storyModel');
const AppError = require('../../errors/appError');


class StoryDao {
    constructor() {
        if (this.constructor == StoryDao)
            throw new Error("Abstract classes can't be instantiated.");
    }
    createStory = async (storyBody) => { };
    getStory = async (storyId) => { };
    getStories = async () => { };
    updateStory = async (storyId, updateBody) => { };
    deleteStory = async (storyId) => { };

}
module.exports = { StoryDao };