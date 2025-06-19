export interface CreateSetDTO {
  reps: number;
  weight: number;
  duration?: number;
  restTime?: number;
  exerciseId: string;
}

export interface UpdateSetDTO {
  id: string;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
}

export interface SetDTO {
  id: string;
  reps: number;
  weight: number;
  duration?: number;
  restTime?: number;
  exerciseId: string;
  createdAt: Date;
  updatedAt: Date;
}
