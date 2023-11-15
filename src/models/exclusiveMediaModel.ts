import Prisma from "./Prisma";

class ExclusiveMediaModel extends Prisma {
    constructor() {
        super();
    }

    async saveExclusiveMedia(media_path: String, media_post_id: String) {
        await this.prisma.$connect();
        const newMedia = this.prisma.Exclusive_media.create({
            data: {
                media_path,
                media_post_id,
            }
        })
        return newMedia;
    }
}

export default ExclusiveMediaModel;