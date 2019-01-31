import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import dotenv = require('dotenv');
import mongoose = require('mongoose');

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoUri = process.env.MONGO_URI;
const mongoDb = process.env.MONGO_DB_NAME;
const mongoOptions = process.env.MONGO_OPTIONS;

const mongoURL = `mongodb://${mongoUser}:${mongoPassword}@${mongoUri}/${mongoDb}?${mongoOptions}`;

mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    MongooseModule.forRoot(mongoURL),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
