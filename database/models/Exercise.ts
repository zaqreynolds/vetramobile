import { Model } from "@nozbe/watermelondb";
import {
  text,
  date,
  readonly,
  children,
  relation,
} from "@nozbe/watermelondb/decorators";
import { Workout } from "./Workout";
import { Set } from "./Set";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "lats"
  | "traps"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "abs"
  | "core";

export type ExerciseType =
  | "strength" // Weight lifting, resistance training
  | "cardio" // Running, cycling, swimming, etc.
  | "stretching" // Static/dynamic stretches
  | "mobility" // Joint mobility exercises
  | "plyometric" // Jumping, explosive movements
  | "bodyweight" // Push-ups, pull-ups, etc.
  | "hiit" // High-intensity interval training
  | "yoga" // Yoga poses and flows
  | "other"; // Any other type not covered

export class Exercise extends Model {
  static table = "exercises";

  @text("name") name!: string;
  @text("notes") notes?: string;
  @text("muscle_group") muscleGroup!: MuscleGroup;
  @text("exercise_type") exerciseType!: ExerciseType;
  @relation("workouts", "workout_id") workout!: Workout;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @children("sets") sets!: Set[];

  get id(): string {
    return this._raw.id;
  }
}
