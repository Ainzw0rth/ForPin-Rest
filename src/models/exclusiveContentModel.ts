import Prisma from "./Prisma";

class ExclusiveContentModel extends Prisma {
    constructor() {
        super();
    }

    async getExclusiveContents() {
        await this.prisma.$connect(); 
        return this.prisma.exclusivecontent.findMany();
    }

    async getExclusiveContent(id: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.premium_user.findFirst({
            where: {
                premium_post_id: id
            }
        })
        return user;
    }
    
    async addExclusiveContent(premium_post_id: String, caption: String, descriptions: String, genre: String) {
        await this.prisma.$connect();
        const newContent = this.prisma.create({
            data: {
                premium_post_id,
                caption, 
                descriptions, 
                genre 
            }
        })
        return newContent;
    }
}

export default ExclusiveContentModel;