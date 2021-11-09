
class UserDao {
    constructor() {
        if (this.constructor == UserDao)
            throw new Error("Abstract classes can't be instantiated.");
    }
    createUser = async (userBody) => { };
    getUser = async (userName) => { };
    getUsers = async () => { };
    updateUser = async (userName, userBody) => { };
    deleteStory = async (userName) => { };

}
module.exports = { UserDao };