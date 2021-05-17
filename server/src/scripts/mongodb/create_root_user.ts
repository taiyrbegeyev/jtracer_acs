/* eslint-disable */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
import App from 'app';
import * as bcrypt from 'bcrypt';
import { moderatorModel, Role } from 'models/moderators';

const email = process.env.JTRACER_ROOT_EMAIL;
const password = process.env.JTRACER_ROOT_PWD;
const firstName = process.env.JTRACER_ROOT_FIRST_NAME;
const lastName = process.env.JTRACER_ROOT_LAST_NAME;
const saltRounds = 10;

App.connectToTheDatabase('127.0.0.1');

bcrypt.genSalt(saltRounds, async (saltError, salt) => {
  if (saltError) {
    console.error(saltError);
    return;
  }

  bcrypt.hash(password, salt, async (hashError, hash) => {
    if (hashError) {
      console.error(hashError);
      return;
    }

    const rootUser = new moderatorModel({
      email,
      hash,
      firstName,
      lastName,
      roles: Object.keys(Role),
      isRegistered: true,
      registrationDate: Date.now()
    });

    try {
      await rootUser.save();
      console.log('Root user added successfully');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  });
});
