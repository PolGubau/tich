import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';

export const DATABASE_NAME = 'misClases';

const expo = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle<typeof schema>(expo, { schema });
export type Db = typeof db;
