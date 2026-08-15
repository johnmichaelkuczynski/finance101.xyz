import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// One row per unique visitor (guest cookie id or Clerk user id).
export const visitorsTable = pgTable("visitors", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull().unique(),
  kind: text("kind").notNull().default("guest"), // guest | user
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Cumulative AI-generated output (characters) per guest. Once a guest passes
// the free-sample threshold, AI endpoints require sign-in.
export const guestUsageTable = pgTable("guest_usage", {
  id: serial("id").primaryKey(),
  guestId: text("guest_id").notNull().unique(),
  aiChars: integer("ai_chars").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
