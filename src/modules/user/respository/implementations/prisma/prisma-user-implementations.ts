import { UserModel } from "@/modules/user/model/user.model";
import { IUserInput, UserRepository } from "../../userRepository";
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async createUser(data: IUserInput | Prisma.UserCreateInput): Promise<UserModel> {
    const user  = await prisma.user.create({
      data
    })
    return user
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) return null;
    return user
  }
}