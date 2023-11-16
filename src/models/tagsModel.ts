import Prisma from "./Prisma";

class TagsModel extends Prisma {
    constructor() {
        super();
    }

    async getAllTags() {
        await this.prisma.$connect();
        let tags = this.prisma.Tag.findMany();
        return tags;
    }
}

export default TagsModel;