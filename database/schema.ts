import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "first_name", type: "string", isIndexed: true },
        { name: "last_name", type: "string", isIndexed: true },
        { name: "birthday", type: "number", isIndexed: true },
        { name: "measurement_preference", type: "string" }, // 'metric' or 'imperial'
        { name: "weight", type: "number", isOptional: true },
        { name: "height", type: "number", isOptional: true },
        { name: "gender", type: "string", isIndexed: true },
        { name: "created_at", type: "number" }, // timestamp in ms
        { name: "updated_at", type: "number" }, // timestamp in ms
      ],
    }),
  ],
});
