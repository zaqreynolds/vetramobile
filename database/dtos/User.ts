export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  birthday: Date;
  measurementPreference: "metric" | "imperial";
  weight?: number;
  height?: number;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
};

export type UpdateUserDTO = Partial<CreateUserDTO>;
