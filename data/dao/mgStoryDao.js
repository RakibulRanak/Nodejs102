const { StoryDao } = require('./storyDao');

class MgStoryDao extends StoryDao {
    constructor() { super() }
}
module.exports = { MgStoryDao };