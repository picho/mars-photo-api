export default class User {

    private username: string;

    public constructor(username: string) {
        this.username = username;
    }

    public getUsername(): String {
        return this.username;
    }

}