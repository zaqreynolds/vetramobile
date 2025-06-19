import { Set } from "../models/Set";
import database from "../index";
import { CreateSetDTO, UpdateSetDTO, SetDTO } from "../dtos/Set";
import { Exercise } from "database/models/Exercise";

export class SetService {
  static async list(): Promise<Set[]> {
    return await database.get<Set>("sets").query().fetch();
  }

  static async getOne(id: string): Promise<Set | null> {
    try {
      const set = await database.get<Set>("sets").find(id);
      return set;
    } catch (error) {
      if (error.message.includes("not found")) {
        return null;
      }
      console.error(error);
      return null;
    }
  }

  static async create(data: CreateSetDTO): Promise<Set> {
    return await database.write(async () => {
      const sets = database.get<Set>("sets");
      const exercise = await database.get("exercises").find(data.exerciseId);

      return await sets.create((set) => {
        set.reps = data.reps;
        set.weight = data.weight;
        set.duration = data.duration;
        set.restTime = data.restTime;
        set.exercise = exercise as Exercise;
      });
    });
  }

  static async update(data: UpdateSetDTO): Promise<Set | null> {
    try {
      return await database.write(async () => {
        const sets = database.get<Set>("sets");
        const set = await sets.find(data.id);

        await set.update((s) => {
          if (data.reps !== undefined) s.reps = data.reps;
          if (data.weight !== undefined) s.weight = data.weight;
          if (data.duration !== undefined) s.duration = data.duration;
          if (data.restTime !== undefined) s.restTime = data.restTime;
          s.updatedAt = new Date();
        });

        return set;
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
        const sets = database.get<Set>("sets");
        const set = await sets.find(id);

        await set.markAsDeleted(); // soft delete
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

  static async getSetWithExercise(id: string): Promise<SetDTO | null> {
    try {
      const set = await this.getOne(id);
      if (!set) return null;

      const exercise = set.exercise;

      return {
        id: set.id,
        reps: set.reps,
        weight: set.weight,
        duration: set.duration,
        restTime: set.restTime,
        exerciseId: exercise.id,
        createdAt: set.createdAt,
        updatedAt: set.updatedAt,
      };
    } catch (error) {
      console.error("Error fetching set with exercise:", error);
      return null;
    }
  }

  static async nukeAll(): Promise<void> {
    const sets = await database.get<Set>("sets").query().fetch();

    await database.write(async () => {
      for (const set of sets) {
        await set.destroyPermanently();
      }
    });
  }
}
