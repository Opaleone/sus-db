const { Check } = require('../../models');
const { confirmCreate } = require('../../../utils/confirmCreate');
const express = require('express');
const checkRouter = express.Router();
const fs = require('fs');

checkRouter.get('/', async (req, res, next) => {
  try {
    const allChecks = await Check.findAll();

    if (!allChecks) {
      const e = new Error("No checks found!");
      e.code = 404;
      throw e;
    }

    res.status(200).json(allChecks);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(e.code).send(e.message);
  }
})

checkRouter.get('/allUserChecks', async (req, res, next) => {
  const { uid, gid, username, guildname } = req.query;

  const { curGuild, curUser } = await confirmCreate(uid, gid, username, guildname);

  try {
    const getChecks = await Check.findAll({
      where: {
        UserId: curUser.id,
        GuildId: curGuild.id
      }
    });

    if (!getChecks.length) res.status(200).json({}); 
    else res.status(200).json(getChecks);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/allUserChecks') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send(e.message);
  }
})

checkRouter.get('/todayChecks', async (req, res, next) => {
  const { uid, gid, username, guildname } = req.query;

  const { curGuild, curUser } = await confirmCreate(uid, gid, username, guildname);

  try {
    const getChecks = await Check.findAll({
      where: {
        date: new Date().toLocaleDateString(),
        UserId: curUser.id,
        GuildId: curGuild.id
      }
    });

    if (!getChecks.length) res.status(200).json({}); 
    else res.status(200).json(getChecks);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/todayChecks') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send(e.message);
  }
})

checkRouter.post('/', async (req, res, next) => {
  const { uid, gid, username, guildname, date, size, status } = req.body;
  try {
    const { curGuild, curUser } = await confirmCreate(uid, gid, username, guildname);

    const newCheck = await Check.create({
      date: date,
      size: size,
      status: status
    })

    await newCheck.setUser(curUser);
    await newCheck.setGuild(curGuild);

    res.status(200).json(newCheck);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - post (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send(e.message);
  }
})

checkRouter.delete('/:checkId', async (req, res, next) => {
  const { checkId } = req.params;

  try {
    const deleteCheck = await Check.destroy({
      where: {
        checkId: checkId
      }
    })

    if (!deleteCheck) {
      const e = new Error(`No check with id of ${checkId}`);
      e.code = 404;
      throw e;
    }

    res.status(200).send(`[SUCCESS] Check with id ${checkId} successfully deleted`);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - delete (Path: '/:checkId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send(e.message);
  }
})

module.exports = checkRouter;