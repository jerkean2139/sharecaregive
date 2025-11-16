import { pgTable, serial, text, integer, timestamp, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Communities table
export const communities = pgTable('communities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  description: text('description'),
  totalRaised: decimal('total_raised', { precision: 12, scale: 2 }).default('0'),
  goalAmount: decimal('goal_amount', { precision: 12, scale: 2 }).default('500000'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Non-profits table
export const nonprofits = pgTable('nonprofits', {
  id: serial('id').primaryKey(),
  communityId: integer('community_id').references(() => communities.id),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category'),
  monthlyFunding: decimal('monthly_funding', { precision: 10, scale: 2 }).default('0'),
  totalRaised: decimal('total_raised', { precision: 12, scale: 2 }).default('0'),
  impactStatement: text('impact_statement'),
  website: text('website'),
  logo: text('logo'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Businesses table
export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  communityId: integer('community_id').references(() => communities.id),
  nonprofitId: integer('nonprofit_id').references(() => nonprofits.id),
  name: text('name').notNull(),
  type: text('type'),
  address: text('address'),
  monthlyContribution: decimal('monthly_contribution', { precision: 10, scale: 2 }).default('0'),
  totalContributed: decimal('total_contributed', { precision: 12, scale: 2 }).default('0'),
  yearJoined: integer('year_joined'),
  website: text('website'),
  logo: text('logo'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Admin users table
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  email: text('email'),
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Admin stats/metrics table
export const adminStats = pgTable('admin_stats', {
  id: serial('id').primaryKey(),
  totalCommunities: integer('total_communities').default(0),
  totalNonprofits: integer('total_nonprofits').default(0),
  totalBusinesses: integer('total_businesses').default(0),
  totalRaised: decimal('total_raised', { precision: 12, scale: 2 }).default('0'),
  monthlyAverage: decimal('monthly_average', { precision: 10, scale: 2 }).default('0'),
  topCommunity: text('top_community'),
  topNonprofit: text('top_nonprofit'),
  recentActivity: jsonb('recent_activity'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define relations
export const communitiesRelations = relations(communities, ({ many }) => ({
  nonprofits: many(nonprofits),
  businesses: many(businesses),
}));

export const nonprofitsRelations = relations(nonprofits, ({ one, many }) => ({
  community: one(communities, {
    fields: [nonprofits.communityId],
    references: [communities.id],
  }),
  businesses: many(businesses),
}));

export const businessesRelations = relations(businesses, ({ one }) => ({
  community: one(communities, {
    fields: [businesses.communityId],
    references: [communities.id],
  }),
  nonprofit: one(nonprofits, {
    fields: [businesses.nonprofitId],
    references: [nonprofits.id],
  }),
}));

// Types
export type Community = typeof communities.$inferSelect;
export type InsertCommunity = typeof communities.$inferInsert;
export type Nonprofit = typeof nonprofits.$inferSelect;
export type InsertNonprofit = typeof nonprofits.$inferInsert;
export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = typeof businesses.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
export type AdminStats = typeof adminStats.$inferSelect;