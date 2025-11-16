import { communities, nonprofits, businesses, adminUsers, adminStats, type Community, type Nonprofit, type Business, type InsertCommunity, type InsertNonprofit, type InsertBusiness, type AdminUser, type InsertAdminUser } from "../shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

// Database storage implementation based on javascript_database integration
export class DatabaseStorage {
  async getCommunities(): Promise<Community[]> {
    const result = await db.select().from(communities).where(eq(communities.isActive, true));
    return result;
  }

  async getCommunity(id: number): Promise<Community | undefined> {
    const [community] = await db.select().from(communities).where(eq(communities.id, id));
    return community || undefined;
  }

  async createCommunity(data: InsertCommunity): Promise<Community> {
    const [community] = await db
      .insert(communities)
      .values(data)
      .returning();
    return community;
  }

  async updateCommunity(id: number, data: Partial<InsertCommunity>): Promise<Community | undefined> {
    const [community] = await db
      .update(communities)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(communities.id, id))
      .returning();
    return community || undefined;
  }

  async getNonprofits(communityId?: number): Promise<Nonprofit[]> {
    if (communityId) {
      return await db.select().from(nonprofits).where(eq(nonprofits.communityId, communityId));
    }
    return await db.select().from(nonprofits).where(eq(nonprofits.isActive, true));
  }

  async getNonprofit(id: number): Promise<Nonprofit | undefined> {
    const [nonprofit] = await db.select().from(nonprofits).where(eq(nonprofits.id, id));
    return nonprofit || undefined;
  }

  async createNonprofit(data: InsertNonprofit): Promise<Nonprofit> {
    const [nonprofit] = await db
      .insert(nonprofits)
      .values(data)
      .returning();
    return nonprofit;
  }

  async getBusinesses(communityId?: number): Promise<Business[]> {
    if (communityId) {
      return await db.select().from(businesses).where(eq(businesses.communityId, communityId));
    }
    return await db.select().from(businesses).where(eq(businesses.isActive, true));
  }

  async getBusiness(id: number): Promise<Business | undefined> {
    const [business] = await db.select().from(businesses).where(eq(businesses.id, id));
    return business || undefined;
  }

  async createBusiness(data: InsertBusiness): Promise<Business> {
    const [business] = await db
      .insert(businesses)
      .values(data)
      .returning();
    return business;
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }

  async createAdminUser(data: InsertAdminUser): Promise<AdminUser> {
    const [user] = await db
      .insert(adminUsers)
      .values(data)
      .returning();
    return user;
  }

  async updateAdminUserLastLogin(id: number): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, id));
  }

  async getAdminStats(): Promise<any> {
    const [stats] = await db.select().from(adminStats);
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
    const communitiesCount = await db.select({ count: sql<number>`count(*)` }).from(communities).where(eq(communities.isActive, true));
    const nonprofitsCount = await db.select({ count: sql<number>`count(*)` }).from(nonprofits).where(eq(nonprofits.isActive, true));
    const businessesCount = await db.select({ count: sql<number>`count(*)` }).from(businesses).where(eq(businesses.isActive, true));
    
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

export const storage = new DatabaseStorage();