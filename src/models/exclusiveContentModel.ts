import Prisma from "./Prisma";

class ExclusiveContentModel extends Prisma {
    constructor() {
        super();
    }

    async getExclusiveContents() {
        await this.prisma.$connect();
        let results = this.prisma.exclusive_content.findMany({
            include: {
              exclusive_media: true,
              premium_user: true,
            },
            orderBy: {
              post_time: 'desc',
            },
        });
        return results;
    }

    async getExclusiveContent(id: String) {
        await this.prisma.$connect();
        let user;
        user = this.prisma.exclusive_content.findFirst({
            where: {
                post_id: id
            }
        })
        return user;
    }
    
    async addExclusiveContent(caption: String, descriptions: String, genre: String, premium_user_id: String) {
        await this.prisma.$connect();
        const newContent = this.prisma.Exclusive_content.create({
            data: {
                caption, 
                descriptions, 
                genre,
                premium_user_id
            }
        })
        return newContent;
    }
}

export default ExclusiveContentModel;