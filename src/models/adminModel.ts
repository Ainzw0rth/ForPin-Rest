import Prisma from "./Prisma";

class AdminModel extends Prisma {
    constructor() {
        super();
    }

    async getAllAdmin() {
        await this.prisma.$connect(); 
        return this.prisma.premium_admin.findMany();
    }

    async getAdminFromEmail(param: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.premium_admin.findFirst({
            where: {
                email: param
            }
        })
        return user;
    }

    async getAdmin(username: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.premium_admin.findFirst({
            where: {
                username: username
            }
        })
        return user;
    }
}

export default AdminModel;