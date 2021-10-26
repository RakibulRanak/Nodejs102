class StoryService {
    constructor(storyDao) {
        this.storyDao = storyDao;
    }
    createStory = async (storyBody) => {
        const story = await this.storyDao.createStory(storyBody);
        return story;
    };
    getStory = async (storyId) => {
        const story = await this.storyDao.getStory(storyId);
        return story;
    };

    getStories = async (req) => {
        const stories = await this.storyDao.getStories(req);
        return stories;
    };
    updateStory = async (storyId, updateBody) => {
        const storyUpdated = await this.storyDao.updateStory(storyId, updateBody);
        return storyUpdated;
    };

    deleteStory = async (storyId) => {
        const storyDeleted = await this.storyDao.deleteStory(storyId);
        return;
    };
}

module.exports = { StoryService };

