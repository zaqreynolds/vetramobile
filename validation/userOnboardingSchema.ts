import { z } from "zod";

export const userOnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthday: z.date({
    required_error: "Birthday is required",
    invalid_type_error: "Birthday must be a date",
  }),
  measurementPreference: z.enum(["metric", "imperial"], {
    required_error: "Measurement preference is required",
    invalid_type_error: "Measurement preference must be a string",
  }),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),
  weight: z.number().min(1).optional(),
  height: z.number().min(1).optional(),
});

export type UserOnboardingSchema = z.infer<typeof userOnboardingSchema>;
