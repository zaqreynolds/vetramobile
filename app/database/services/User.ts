import { User } from "../models/User";
import database from "../index";
import { Q } from "@nozbe/watermelondb";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/User";

export class UserService {
  static async list(): Promise<User[]> {
    return await database.get<User>("users").query().fetch();
  }

  static async getOne(id: string): Promise<User | null> {
    try {
      const user = await database.get<User>("users").find(id);
      return user;
    } catch (error) {
      if (error.message.includes("not found")) {
        return null;
      }
      console.error(error);
      return null;
    }
  }

  static async create(data: CreateUserDTO): Promise<User> {
    return await database.write(async () => {
      const users = database.get<User>("users");
      return await users.create((user) => {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.birthday = data.birthday;
        user.measurementPreference = data.measurementPreference;
        user.weight = data.weight;
        user.height = data.height;
        user.gender = data.gender;
        user.createdAt = new Date();
        user.updatedAt = new Date();
      });
    });
  }

  static async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    try {
      return await database.write(async () => {
        const users = database.get<User>("users");
        const user = await users.find(id);

        await user.update((u) => {
          if (data.firstName !== undefined) u.firstName = data.firstName;
          if (data.lastName !== undefined) u.lastName = data.lastName;
          if (data.birthday !== undefined) u.birthday = data.birthday;
          if (data.measurementPreference !== undefined)
            u.measurementPreference = data.measurementPreference;
          if (data.weight !== undefined) u.weight = data.weight;
          if (data.height !== undefined) u.height = data.height;
          if (data.gender !== undefined) u.gender = data.gender;
          u.updatedAt = new Date();
        });

        return user;
      });
    } catch (error) {
      if (error.message.includes("not found")) {
        return null;
      }
      console.error(error);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await database.write(async () => {
        const users = database.get<User>("users");
        const user = await users.find(id); // throws if not found

        await user.markAsDeleted(); // soft delete
        return true;
      });
    } catch (error) {
      if (error.message.includes("not found")) {
        return false;
      }
      console.error("Delete error:", error);
      return false;
    }
  }
}
