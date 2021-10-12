const { PgStoryService } = require('./pgStoryService');
const { MgStoryService } = require('./mgStoryService');


class StoryService {
    constructor() {
        if (this.service)
            return this.service;
        else {
            if (process.env.DB == 'postgres')
                this.service = new PgStoryService();
            else
                this.service = new MgStoryService();
        };
    }
    createStory(storyBody) { return this.service.createStory(storyBody) };
    getStory(storyId) { return this.service.getStory(storyId) };
    getStories() { return this.service.getStories() };
    updateStory(storyId, updateBody) { return this.service.updateStory(storyId, updateBody) };
    deleteStory(storyId) { return this.service.deleteStory(storyId) };
}

module.exports = { StoryService };