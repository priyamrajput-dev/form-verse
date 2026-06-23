import { pgTable, uuid, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    fullName: varchar("full_name", {length: 100}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    passwordHash: text("password_hash"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAT: timestamp("updated_at").$onUpdate(()=> new Date()),

})