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

    async getPremiumUsersNotInList(usernames: string[]): Promise<any[]> {
        console.log(usernames);
        await this.prisma.$connect();
        let premiumUsers;
        premiumUsers = this.prisma.premium_user.findMany({
          where: {
            username: {
              notIn: usernames,
            },
          },
        });
      
        return premiumUsers;
      }

    async addUser(email: String, fullname: String, username: String, password: String, profile_path: String, is_admin: Boolean) {
        await this.prisma.$connect();
        const newUser = this.prisma.premium_user.create({
            data: {
                email, 
                fullname, 
                username,
                password,
                profile_path,
                is_admin
            }
        });
        return newUser;
    }
}

export default UserModel;