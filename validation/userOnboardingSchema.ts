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
  gender: z
    .union([
      z.literal("male"),
      z.literal("female"),
      z.literal("other"),
      z.literal("prefer_not_to_say"),
      z.literal(""), // <-- allows default to be an empty string
    ])
    .refine((val) => val !== "", {
      message: "Gender is required",
    }),
  weight: z.number().min(1).optional(),
  height: z.number().min(1).optional(),

  heightFeet: z.number().min(1).optional(),
  heightInches: z.number().min(1).optional(),
});

type GenderOption = "male" | "female" | "other" | "prefer_not_to_say" | "";

export type UserOnboardingSchema = Omit<
  z.infer<typeof userOnboardingSchema>,
  "gender"
> & { gender: GenderOption };
