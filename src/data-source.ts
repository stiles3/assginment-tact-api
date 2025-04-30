import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Load environment variables

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'P@ssw0rd',
  database: 'tact-api',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false, // Important: must be false for migrations
});
