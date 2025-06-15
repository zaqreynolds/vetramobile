import { MuscleGroup, ExerciseType } from "../models/Exercise";

export interface CreateExerciseDTO {
  name: string;
  notes?: string;
  muscleGroup: MuscleGroup;
  exerciseType: ExerciseType;
  workoutId: string;
}

export interface UpdateExerciseDTO {
  name?: string;
  notes?: string;
  muscleGroup?: MuscleGroup;
  exerciseType?: ExerciseType;
}

export interface ExerciseWithSetsDTO {
  id: string;
  name: string;
  notes?: string;
  muscleGroup: MuscleGroup;
  exerciseType: ExerciseType;
  workoutId: string;
  createdAt: Date;
  updatedAt: Date;
  sets: SetDTO[];
}

export interface SetDTO {
  id: string;
  reps: number;
  weight: number;
  duration?: number;
  restTime?: number;
}
