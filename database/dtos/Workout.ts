import { MuscleGroup, ExerciseType } from "../models/Exercise";
import { ExerciseWithSetsDTO } from "./Exercise";

export interface CreateWorkoutDTO {
  name: string;
  notes?: string;
  date: Date;
}

export interface UpdateWorkoutDTO {
  id: string;
  name?: string;
  notes?: string;
  date?: Date;
}

export interface WorkoutWithExercisesDTO {
  id: string;
  name: string;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  exercises: ExerciseWithSetsDTO[];
}
