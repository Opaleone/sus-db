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

guildRouter.get('/:guildId/:guildName', async (req, res, next) => {
  const { guildId, guildName } = req.params;

  try {
    let getGuild = await Guild.findOne({
      where: {
        guildId: guildId
      }
    });

    if (!getGuild) {
      getGuild = await Guild.create({
        guildId: guildId,
        guildName: guildName
      })
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
  const { guildId, guildName, channelId, checkAmount } = req.body;

  try {
    let curGuild = await Guild.findOne({
      where: {
        guildId: guildId
      }
    })

    if (!curGuild) {
      curGuild = await Guild.create({
        guildId: guildId,
        guildName: guildName,
        channelId: channelId,
        checkAmount: checkAmount
      })

      res.status(200).json(curGuild);
      return;
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

    res.status(500).send(e.message);
  }
})

module.exports = guildRouter;