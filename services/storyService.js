class StoryService {
    constructor(storyDao) {
        this.storyDao = storyDao;
    }
    createStory = async (req) => {
        req.body.username = req.user.username;
        const story = await this.storyDao.createStory(req.body);
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
    updateStory = async (req) => {
        const storyUpdated = await this.storyDao.updateStory(req);
        return storyUpdated;
    };

    deleteStory = async (req) => {
        const storyDeleted = await this.storyDao.deleteStory(req);
        return;
    };
}

module.exports = { StoryService };

