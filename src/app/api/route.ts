import { NextResponse } from 'next/server';
import { Config } from 'sst/node/config';

import { dbNow, addLead } from '@/app/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
  const secretVal = Config.SECRET_VAL;
  const dbString = Config.DATABASE_URL;
  const stage = Config.STAGE;
  const now = await dbNow();
  const leadResult = await addLead({ email: 'abc123@abc123.com' });

  return NextResponse.json(
    {
      hello: 'World',
      stage,
      secretVal,
      leadResult,
      dbString: `${dbString}`.slice(0, 25),
      now: now ?? null,
    },
    { status: 200 }
  );
}
