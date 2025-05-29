import { Model } from "@nozbe/watermelondb";
import { text, field, date, readonly } from "@nozbe/watermelondb/decorators";

type MeasurementPreference = "metric" | "imperial";
type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export class User extends Model {
  static table = "users";

  @text("first_name") firstName!: string;
  @text("last_name") lastName!: string;
  @date("birthday") birthday!: Date;
  @field("measurement_preference")
  measurementPreference!: MeasurementPreference;
  @field("weight") weight?: number;
  @field("height") height?: number;
  @field("gender") gender?: Gender;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  // Computed properties
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
