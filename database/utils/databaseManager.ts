import { WorkoutService } from "../services/Workout";
import { ExerciseService } from "../services/Exercise";
import { SetService } from "../services/Set";
import { UserService } from "../services/User";

/**
 * Utility functions for managing the database
 */
export class DatabaseManager {
  /**
   * Permanently deletes all records from the database in the correct order
   * to maintain referential integrity.
   *
   * Order of deletion:
   * 1. Sets (depends on Exercises)
   * 2. Exercises (depends on Workouts)
   * 3. Workouts (depends on Users)
   * 4. Users
   */
  static async nukeDatabase(): Promise<void> {
    console.log("🚀 Starting database nuke...");

    try {
      console.log("💥 Deleting all sets...");
      await SetService.nukeAll();

      console.log("💥 Deleting all exercises...");
      await ExerciseService.nukeAll();

      console.log("💥 Deleting all workouts...");
      await WorkoutService.nukeAll();

      console.log("💥 Deleting all users...");
      await UserService.nukeAll();

      console.log("✅ Database nuke completed successfully!");
    } catch (error) {
      console.error("❌ Error during database nuke:", error);
      throw error;
    }
  }

  /**
   * Checks if the database is empty
   */
  static async isDatabaseEmpty(): Promise<boolean> {
    const users = await UserService.list();
    const workouts = await WorkoutService.list();
    const exercises = await ExerciseService.list();
    const sets = await SetService.list();

    return (
      users.length === 0 &&
      workouts.length === 0 &&
      exercises.length === 0 &&
      sets.length === 0
    );
  }

  /**
   * Gets the count of records in the database
   */
  static async getDatabaseStats(): Promise<{
    users: number;
    workouts: number;
    exercises: number;
    sets: number;
  }> {
    const users = await UserService.list();
    const workouts = await WorkoutService.list();
    const exercises = await ExerciseService.list();
    const sets = await SetService.list();

    return {
      users: users.length,
      workouts: workouts.length,
      exercises: exercises.length,
      sets: sets.length,
    };
  }
}
