import { Model } from "@nozbe/watermelondb";
import {
  text,
  field,
  date,
  readonly,
  children,
} from "@nozbe/watermelondb/decorators";
import { Workout } from "./Workout";

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
  @text("gender") gender!: Gender;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @children("workouts") workouts!: Workout[];

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get id(): string {
    return this._raw.id;
  }

  get age() {
    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
