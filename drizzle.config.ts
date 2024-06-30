const drizzleConfig = {
  dialect: 'postgresql',
  schema: './src/app/lib/schema.ts',
  out: './src/migrations',
};

export default drizzleConfig;
