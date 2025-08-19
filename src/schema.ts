import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

// Example: users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: text("email").notNull(),
});