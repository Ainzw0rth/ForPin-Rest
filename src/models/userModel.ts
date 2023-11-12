import Prisma from "./Prisma";

class UserModel extends Prisma {
    constructor() {
        super();
    }

    async getAllUsers() {
        await this.prisma.$connect(); 
        return this.prisma.premium_user.findMany();
    }

    async getUserFromEmail(param: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.premium_user.findFirst({
            where: {
                email: param
            }
        })
        return user;
    }

    async getUser(username: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.premium_user.findFirst({
            where: {
                username: username
            }
        })
        return user;
    }
}

export default UserModel;