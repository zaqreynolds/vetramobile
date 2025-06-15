import { Exercise } from "../models/Exercise";
import database from "../index";
import {
  CreateExerciseDTO,
  UpdateExerciseDTO,
  ExerciseWithSetsDTO,
} from "../dtos/Exercise";
import { Workout } from "database/models/Workout";

export class ExerciseService {
  static async list(): Promise<Exercise[]> {
    return await database.get<Exercise>("exercises").query().fetch();
  }

  static async getOne(id: string): Promise<Exercise | null> {
    try {
      const exercise = await database.get<Exercise>("exercises").find(id);
      return exercise;
    } catch (error) {
      if (error.message.includes("not found")) {
        return null;
      }
      console.error(error);
      return null;
    }
  }

  static async create(data: CreateExerciseDTO): Promise<Exercise> {
    return await database.write(async () => {
      const exercises = database.get<Exercise>("exercises");
      const workout = await database.get("workouts").find(data.workoutId);

      return await exercises.create((exercise) => {
        exercise.name = data.name;
        exercise.notes = data.notes;
        exercise.muscleGroup = data.muscleGroup;
        exercise.exerciseType = data.exerciseType;
        exercise.workout = workout as Workout;
      });
    });
  }

  static async update(
    id: string,
    data: UpdateExerciseDTO
  ): Promise<Exercise | null> {
    try {
      return await database.write(async () => {
        const exercises = database.get<Exercise>("exercises");
        const exercise = await exercises.find(id);

        await exercise.update((e) => {
          if (data.name !== undefined) e.name = data.name;
          if (data.notes !== undefined) e.notes = data.notes;
          if (data.muscleGroup !== undefined) e.muscleGroup = data.muscleGroup;
          if (data.exerciseType !== undefined)
            e.exerciseType = data.exerciseType;
          e.updatedAt = new Date();
        });

        return exercise;
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
        const exercises = database.get<Exercise>("exercises");
        const exercise = await exercises.find(id);

        await exercise.markAsDeleted(); // soft delete
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

  static async getExerciseWithSets(
    id: string
  ): Promise<ExerciseWithSetsDTO | null> {
    try {
      const exercise = await this.getOne(id);
      if (!exercise) return null;

      const sets = exercise.sets;
      const workout = exercise.workout;

      return {
        id: exercise.id,
        name: exercise.name,
        notes: exercise.notes,
        muscleGroup: exercise.muscleGroup,
        exerciseType: exercise.exerciseType,
        workoutId: workout.id,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        sets: sets.map((set) => ({
          id: set.id,
          reps: set.reps,
          weight: set.weight,
          duration: set.duration,
          restTime: set.restTime,
        })),
      };
    } catch (error) {
      console.error("Error fetching exercise with sets:", error);
      return null;
    }
  }

  static async nukeAll(): Promise<void> {
    const exercises = await database.get<Exercise>("exercises").query().fetch();

    await database.write(async () => {
      for (const exercise of exercises) {
        await exercise.destroyPermanently();
      }
    });
  }
}
