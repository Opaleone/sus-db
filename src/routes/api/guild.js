const express = require('express');
const guildRouter = express.Router();
const db = require('../../../db/connection');
const fs = require('fs')

const { Guild } = require('../../models/');

guildRouter.get('/', async (req, res, next) => {
  try {
    const allGuilds = await Guild.findAll();

    res.status(200).json(allGuilds);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: guild - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

guildRouter.get('/:guildId', async (req, res, next) => {
  const { guildId } = req.params;

  try {
    const getGuild = await Guild.findOne({
      where: {
        guildId: guildId
      }
    });

    if (!getGuild) {
      throw new Error(`No guild with id of ${guildId}`);
    }

    res.status(200).json(getGuild);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: guild - get (Path: '/:guildId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

guildRouter.post('/:guildId', async (req, res, next) => {
  const { guildId } = req.params;

  try {
    const newGuild = await Guild.create({
      guildId: guildId
    })

    res.status(200).send(`[SUCCESS] Guild with id ${guildId} successfully created`);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: guild - post (Path: '/:guildId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

module.exports = guildRouter;