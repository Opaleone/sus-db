const { Check, Average } = require('../src/models');
const { db } = require('../db/connection');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/db.sqlite',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Synchronize the model with the database to ensure it's usable
    await Average.sync();
    await Check.sync();

    // Delete all rows from the Check table
    await Average.destroy({ where: {}});
    console.log('Averages destroyed!');
    await Check.destroy({ where: {} });
    console.log('Checks destroyed!');
  } catch (error) {
    console.error('Error destroying Checks:', error);
  } finally {
    await sequelize.close();
  }
})();