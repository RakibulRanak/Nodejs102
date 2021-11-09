class UserDto {
    constructor(user) {
        this.email = user.email;
        this.name = user.name;
        this.username = user.username;
    }
}

module.exports = { UserDto }