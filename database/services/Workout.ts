import { Workout } from "../models/Workout";
import database from "../index";
import {
  CreateWorkoutDTO,
  UpdateWorkoutDTO,
  WorkoutWithExercisesDTO,
} from "../dtos/Workout";

export class WorkoutService {
  static async list(): Promise<Workout[]> {
    return await database.get<Workout>("workouts").query().fetch();
  }

  static async getOne(id: string): Promise<Workout | null> {
    try {
      const workout = await database.get<Workout>("workouts").find(id);
      return workout;
    } catch (error) {
      if (error.message.includes("not found")) {
        return null;
      }
      console.error(error);
      return null;
    }
  }

  static async create(data: CreateWorkoutDTO): Promise<Workout> {
    return await database.write(async () => {
      const workouts = database.get<Workout>("workouts");
      return await workouts.create((workout) => {
        workout.name = data.name;
        workout.notes = data.notes;
        workout.date = data.date;
      });
    });
  }

  static async update(
    id: string,
    data: UpdateWorkoutDTO
  ): Promise<Workout | null> {
    try {
      return await database.write(async () => {
        const workouts = database.get<Workout>("workouts");
        const workout = await workouts.find(id);

        await workout.update((w) => {
          if (data.name !== undefined) w.name = data.name;
          if (data.notes !== undefined) w.notes = data.notes;
          if (data.date !== undefined) w.date = data.date;
          w.updatedAt = new Date();
        });

        return workout;
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
        const workouts = database.get<Workout>("workouts");
        const workout = await workouts.find(id);

        await workout.markAsDeleted(); // soft delete
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

  static async getWorkoutWithExercises(
    id: string
  ): Promise<WorkoutWithExercisesDTO | null> {
    try {
      const workout = await this.getOne(id);
      if (!workout) return null;

      const exercises = workout.exercises;
      const exercisesWithSets = await Promise.all(
        exercises.map(async (exercise) => {
          const sets = exercise.sets;
          return {
            id: exercise.id,
            name: exercise.name,
            notes: exercise.notes,
            muscleGroup: exercise.muscleGroup,
            exerciseType: exercise.exerciseType,
            sets: sets.map((set) => ({
              id: set.id,
              reps: set.reps,
              weight: set.weight,
              duration: set.duration,
              restTime: set.restTime,
            })),
          };
        })
      );

      return {
        id: workout.id,
        name: workout.name,
        notes: workout.notes,
        date: workout.date,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        exercises: exercisesWithSets,
      };
    } catch (error) {
      console.error("Error fetching workout with exercises:", error);
      return null;
    }
  }

  static async nukeAll(): Promise<void> {
    const workouts = await database.get<Workout>("workouts").query().fetch();

    await database.write(async () => {
      for (const workout of workouts) {
        await workout.destroyPermanently();
      }
    });
  }
}
