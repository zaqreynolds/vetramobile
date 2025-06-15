import { MuscleGroup, ExerciseType } from "../models/Exercise";

export interface CreateWorkoutDTO {
  name: string;
  notes?: string;
  date: Date;
}

export interface UpdateWorkoutDTO {
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
  exercises: ExerciseDTO[];
}

export interface ExerciseDTO {
  id: string;
  name: string;
  notes?: string;
  muscleGroup: MuscleGroup;
  exerciseType: ExerciseType;
  sets: SetDTO[];
}

export interface SetDTO {
  id: string;
  reps: number;
  weight: number;
  duration?: number;
  restTime?: number;
}
