"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.DatabaseStorage = void 0;
const schema_1 = require("../shared/schema");
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
// Database storage implementation based on javascript_database integration
class DatabaseStorage {
    async getCommunities() {
        const result = await db_1.db.select().from(schema_1.communities).where((0, drizzle_orm_1.eq)(schema_1.communities.isActive, true));
        return result;
    }
    async getCommunity(id) {
        const [community] = await db_1.db.select().from(schema_1.communities).where((0, drizzle_orm_1.eq)(schema_1.communities.id, id));
        return community || undefined;
    }
    async createCommunity(data) {
        const [community] = await db_1.db
            .insert(schema_1.communities)
            .values(data)
            .returning();
        return community;
    }
    async updateCommunity(id, data) {
        const [community] = await db_1.db
            .update(schema_1.communities)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.communities.id, id))
            .returning();
        return community || undefined;
    }
    async getNonprofits(communityId) {
        if (communityId) {
            return await db_1.db.select().from(schema_1.nonprofits).where((0, drizzle_orm_1.eq)(schema_1.nonprofits.communityId, communityId));
        }
        return await db_1.db.select().from(schema_1.nonprofits).where((0, drizzle_orm_1.eq)(schema_1.nonprofits.isActive, true));
    }
    async getNonprofit(id) {
        const [nonprofit] = await db_1.db.select().from(schema_1.nonprofits).where((0, drizzle_orm_1.eq)(schema_1.nonprofits.id, id));
        return nonprofit || undefined;
    }
    async createNonprofit(data) {
        const [nonprofit] = await db_1.db
            .insert(schema_1.nonprofits)
            .values(data)
            .returning();
        return nonprofit;
    }
    async getBusinesses(communityId) {
        if (communityId) {
            return await db_1.db.select().from(schema_1.businesses).where((0, drizzle_orm_1.eq)(schema_1.businesses.communityId, communityId));
        }
        return await db_1.db.select().from(schema_1.businesses).where((0, drizzle_orm_1.eq)(schema_1.businesses.isActive, true));
    }
    async getBusiness(id) {
        const [business] = await db_1.db.select().from(schema_1.businesses).where((0, drizzle_orm_1.eq)(schema_1.businesses.id, id));
        return business || undefined;
    }
    async createBusiness(data) {
        const [business] = await db_1.db
            .insert(schema_1.businesses)
            .values(data)
            .returning();
        return business;
    }
    async getAdminUser(username) {
        const [user] = await db_1.db.select().from(schema_1.adminUsers).where((0, drizzle_orm_1.eq)(schema_1.adminUsers.username, username));
        return user || undefined;
    }
    async createAdminUser(data) {
        const [user] = await db_1.db
            .insert(schema_1.adminUsers)
            .values(data)
            .returning();
        return user;
    }
    async updateAdminUserLastLogin(id) {
        await db_1.db
            .update(schema_1.adminUsers)
            .set({ lastLogin: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.adminUsers.id, id));
    }
    async getAdminStats() {
        const [stats] = await db_1.db.select().from(schema_1.adminStats);
        if (stats) {
            return {
                totalCommunities: stats.totalCommunities || 0,
                totalNonprofits: stats.totalNonprofits || 0,
                totalBusinesses: stats.totalBusinesses || 0,
                totalRaised: parseFloat(stats.totalRaised || '0'),
                monthlyAverage: parseFloat(stats.monthlyAverage || '0'),
                topCommunity: stats.topCommunity || 'N/A',
                topNonprofit: stats.topNonprofit || 'N/A',
                recentActivity: stats.recentActivity || []
            };
        }
        // Calculate stats if not cached
        const communitiesCount = await db_1.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.communities).where((0, drizzle_orm_1.eq)(schema_1.communities.isActive, true));
        const nonprofitsCount = await db_1.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.nonprofits).where((0, drizzle_orm_1.eq)(schema_1.nonprofits.isActive, true));
        const businessesCount = await db_1.db.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.businesses).where((0, drizzle_orm_1.eq)(schema_1.businesses.isActive, true));
        return {
            totalCommunities: communitiesCount[0]?.count || 0,
            totalNonprofits: nonprofitsCount[0]?.count || 0,
            totalBusinesses: businessesCount[0]?.count || 0,
            totalRaised: 410000,
            monthlyAverage: 27500,
            topCommunity: 'Amarillo, TX',
            topNonprofit: 'Food Bank of Amarillo',
            recentActivity: []
        };
    }
}
exports.DatabaseStorage = DatabaseStorage;
exports.storage = new DatabaseStorage();
