import { Model } from "@nozbe/watermelondb";
import {
  field,
  date,
  readonly,
  relation,
} from "@nozbe/watermelondb/decorators";
import { Exercise } from "./Exercise";

export class Set extends Model {
  static table = "sets";

  @field("reps") reps!: number;
  @field("weight") weight!: number;
  @field("duration") duration?: number; // in seconds, for timed exercises
  @field("rest_time") restTime?: number; // in seconds
  @relation("exercises", "exercise_id") exercise!: Exercise;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  get id(): string {
    return this._raw.id;
  }
}
