"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { url },
} = require("../configs/config.mongdb");


const connectString = url;

class Database {
  constructor() {
    this.connect();
  }

  // Connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => console.log(`Connected Mongodb Success PRO`, countConnect()))
      .catch((err) => console.log(`Error Connect`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
