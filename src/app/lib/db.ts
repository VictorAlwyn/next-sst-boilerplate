import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Config } from 'sst/node/config';

import * as schema from '@/app/lib/schema';

export async function dbClient(useSQLOnly: boolean) {
  neonConfig.fetchConnectionCache = true;
  const sql = neon(Config.DATABASE_URL);
  if (useSQLOnly) {
    return sql;
  }
  return drizzle(sql);
}

export async function dbNow() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sql: any = await dbClient(true);
  const dbResult = await sql`SELECT NOW()`;
  if (dbResult.length === 1) {
    return dbResult[0].now;
  }
  return null;
}

export async function addLead({ email }: { email: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db: any = await dbClient(false);
  const dbResult = await db
    .insert(schema.LeadTable)
    .values({ email })
    .returning({ timestamp: schema.LeadTable.createdAt });
  if (dbResult.length === 1) {
    return dbResult[0].timestamp;
  }

  return null;
}
