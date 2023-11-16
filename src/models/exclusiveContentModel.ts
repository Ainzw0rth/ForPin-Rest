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
    
    async addExclusiveContent(user_id: any, input_caption: any, descriptions: any, media_paths: any, genres: any) {
        await this.prisma.$connect();

        const newContent = await this.prisma.Exclusive_content.create({
            data: {
                caption: input_caption,
                descriptions: descriptions,
                premium_user_id: user_id,
            }
        });
    
        const mediaPromises = media_paths.map(async (media_path: string) => {
            return await this.prisma.Exclusive_media.create({
                data: {
                    media_path: media_path,
                    media_post_id: newContent.post_id,
                },
            });
        });
    
        const tagPromises = genres.map(async (genre: string) => {
            const existingTag = await this.prisma.Tag.findUnique({
              where: { genre: genre },
            });
          
            const tag = existingTag ? existingTag: await this.prisma.Tag.create({ data: { genre: genre } });
          
            return await this.prisma.Tag.update({
              where: { genre: tag.genre },
              data: {
                exclusive_content: {
                  connect: {
                    post_id: newContent.post_id,
                  },
                },
              },
            });
          });
    
        const [media, tags] = await Promise.all([Promise.all(mediaPromises), Promise.all(tagPromises)]);
    
        return {
            newContent: newContent,
            media: media,
            tags: tags,
        };
    }
}

export default ExclusiveContentModel;