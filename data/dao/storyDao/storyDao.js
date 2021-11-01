
class StoryDao {
    constructor() {
        if (this.constructor == StoryDao)
            throw new Error("Abstract classes can't be instantiated.");
    }
    createStory = async (storyBody) => { };
    getStory = async (storyId) => { };
    getStories = async () => { };
    updateStory = async (req) => { };
    deleteStory = async (req) => { };

}
module.exports = { StoryDao };