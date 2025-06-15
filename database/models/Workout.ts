import { Model } from "@nozbe/watermelondb";
import { text, date, readonly, children } from "@nozbe/watermelondb/decorators";
import { Exercise } from "./Exercise";

export class Workout extends Model {
  static table = "workouts";

  @text("name") name!: string;
  @text("notes") notes?: string;
  @date("date") date!: Date;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  @children("exercises") exercises!: Exercise[];

  get id(): string {
    return this._raw.id;
  }
}
