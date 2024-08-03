const { Average } = require('../../models');
const { confirmCreate } = require('../../../utils/confirmCreate');
const express = require('express');
const averageRouter = express.Router();
const fs = require('fs');

averageRouter.get('/', async (req, res, next) => {
  try {
    const allAverages = await Average.findAll();

    if (!allAverages) {
      const e = new Error("No averages found!");
      e.code = 404;
      throw e;
    }

    res.status(200).json(allAverages);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: average - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(e.code).send(e.message);
  }
})

averageRouter.get('/single', )

averageRouter.post('/', async (req, res, next) => {
  const { uid, gid, username, guildname, size } = req.body;
  try {
    const { curGuild, curUser } = await confirmCreate(uid, gid, username, guildname);

    const averageCreate = await Average.create({
      total: size,
    })

  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: average - post (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(e.code).send(e.message);
  }
})