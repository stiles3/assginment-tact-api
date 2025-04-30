import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/user/auth.module';
import { DepartmentModule } from './modules/department/department.module';
import * as cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }), // Add request and response to context
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'tact-api',
      entities: [],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'P@ssw0rd',
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*'); // Apply cookie-parser middleware globally
  }
}
