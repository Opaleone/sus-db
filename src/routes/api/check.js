const { Check } = require('../../models');
const { confirmCreate } = require('../../../utils/confirmCreate');
const express = require('express');
const checkRouter = express.Router();
const fs = require('fs');

checkRouter.get('/', async (req, res, next) => {
  try {
    const allChecks = await Check.findAll();

    res.status(200).json(allChecks);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

checkRouter.get('/:uid/:gid', async (req, res, next) => {
  const { uid, gid } = req.params;

  try {
    const getChecks = await Check.findAll({
      where: {
        UserId: uid,
        GuildId: gid
      }
    });

    if (!getChecks) {
      throw new Error(`No check with id of ${uid}`);
    }

    res.status(200).json(getChecks);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/:uid') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

checkRouter.post('/', async (req, res, next) => {
  const { uid, gid, username, guildname, size, status } = req.body;
  try {
    const { curGuild, curUser } = confirmCreate(uid, gid, username, guildname);

    const newCheck = await Check.create({
      size: size,
      status: status
    })

    newCheck.setUser(curUser);
    newCheck.setGuild(curGuild);

    res.status(200).send(`[SUCCESS] Check successfully created for user with id ${uid}`);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - post (Path: '/:checkId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
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
      throw new Error(`No check with id of ${checkId}`);
    }

    res.status(200).send(`[SUCCESS] Check with id ${checkId} successfully deleted`);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - delete (Path: '/:checkId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

module.exports = checkRouter;