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

guildRouter.put('/edit', async (req, res, next) => {
  const { guildId, channelId, checkAmount } = req.body;

  try {
    const curGuild = await Guild.findOne({
      where: {
        guildId: guildId
      }
    })

    if (!curGuild) {
      const e = new Error(`No guild with id: ${guildId}`);
      e.code = 404;
      throw e;
    }

    curGuild.update({
      channelId: channelId,
      checkAmount: checkAmount
    })

    res.status(200).json(curGuild);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: guild - put (Path: '/edit') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(e.code).send(e.message);
  }
})

module.exports = guildRouter;