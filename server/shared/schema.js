"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessesRelations = exports.nonprofitsRelations = exports.communitiesRelations = exports.adminStats = exports.adminUsers = exports.businesses = exports.nonprofits = exports.communities = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Communities table
exports.communities = (0, pg_core_1.pgTable)('communities', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    city: (0, pg_core_1.text)('city').notNull(),
    state: (0, pg_core_1.text)('state').notNull(),
    latitude: (0, pg_core_1.decimal)('latitude', { precision: 10, scale: 7 }).notNull(),
    longitude: (0, pg_core_1.decimal)('longitude', { precision: 10, scale: 7 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    totalRaised: (0, pg_core_1.decimal)('total_raised', { precision: 12, scale: 2 }).default('0'),
    goalAmount: (0, pg_core_1.decimal)('goal_amount', { precision: 12, scale: 2 }).default('500000'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Non-profits table
exports.nonprofits = (0, pg_core_1.pgTable)('nonprofits', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    communityId: (0, pg_core_1.integer)('community_id').references(() => exports.communities.id),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.text)('category'),
    monthlyFunding: (0, pg_core_1.decimal)('monthly_funding', { precision: 10, scale: 2 }).default('0'),
    totalRaised: (0, pg_core_1.decimal)('total_raised', { precision: 12, scale: 2 }).default('0'),
    impactStatement: (0, pg_core_1.text)('impact_statement'),
    website: (0, pg_core_1.text)('website'),
    logo: (0, pg_core_1.text)('logo'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Businesses table
exports.businesses = (0, pg_core_1.pgTable)('businesses', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    communityId: (0, pg_core_1.integer)('community_id').references(() => exports.communities.id),
    nonprofitId: (0, pg_core_1.integer)('nonprofit_id').references(() => exports.nonprofits.id),
    name: (0, pg_core_1.text)('name').notNull(),
    type: (0, pg_core_1.text)('type'),
    address: (0, pg_core_1.text)('address'),
    monthlyContribution: (0, pg_core_1.decimal)('monthly_contribution', { precision: 10, scale: 2 }).default('0'),
    totalContributed: (0, pg_core_1.decimal)('total_contributed', { precision: 12, scale: 2 }).default('0'),
    yearJoined: (0, pg_core_1.integer)('year_joined'),
    website: (0, pg_core_1.text)('website'),
    logo: (0, pg_core_1.text)('logo'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Admin users table
exports.adminUsers = (0, pg_core_1.pgTable)('admin_users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.text)('username').unique().notNull(),
    passwordHash: (0, pg_core_1.text)('password_hash').notNull(),
    email: (0, pg_core_1.text)('email'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    lastLogin: (0, pg_core_1.timestamp)('last_login'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
// Admin stats/metrics table
exports.adminStats = (0, pg_core_1.pgTable)('admin_stats', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    totalCommunities: (0, pg_core_1.integer)('total_communities').default(0),
    totalNonprofits: (0, pg_core_1.integer)('total_nonprofits').default(0),
    totalBusinesses: (0, pg_core_1.integer)('total_businesses').default(0),
    totalRaised: (0, pg_core_1.decimal)('total_raised', { precision: 12, scale: 2 }).default('0'),
    monthlyAverage: (0, pg_core_1.decimal)('monthly_average', { precision: 10, scale: 2 }).default('0'),
    topCommunity: (0, pg_core_1.text)('top_community'),
    topNonprofit: (0, pg_core_1.text)('top_nonprofit'),
    recentActivity: (0, pg_core_1.jsonb)('recent_activity'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
// Define relations
exports.communitiesRelations = (0, drizzle_orm_1.relations)(exports.communities, ({ many }) => ({
    nonprofits: many(exports.nonprofits),
    businesses: many(exports.businesses),
}));
exports.nonprofitsRelations = (0, drizzle_orm_1.relations)(exports.nonprofits, ({ one, many }) => ({
    community: one(exports.communities, {
        fields: [exports.nonprofits.communityId],
        references: [exports.communities.id],
    }),
    businesses: many(exports.businesses),
}));
exports.businessesRelations = (0, drizzle_orm_1.relations)(exports.businesses, ({ one }) => ({
    community: one(exports.communities, {
        fields: [exports.businesses.communityId],
        references: [exports.communities.id],
    }),
    nonprofit: one(exports.nonprofits, {
        fields: [exports.businesses.nonprofitId],
        references: [exports.nonprofits.id],
    }),
}));
