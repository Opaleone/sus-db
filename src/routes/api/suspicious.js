const express = require('express');
const suspiciousRouter = express.Router();
const fs = require('fs')

const { Suspicious } = require('../../models/');

suspiciousRouter.get('/', async (req, res, next) => {
  try {
    const allSusWords = await Suspicious.findAll();

    if (!allSusWords) {
      res.status(404).send("No suspicious words found!");
    }

    res.status(200).json(allSusWords);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: suspicious - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

suspiciousRouter.post('/:susWord', async (req, res, next) => {
  const { susWord } = req.params;

  try {
    await Suspicious.create({
      word: susWord
    })

    res.status(201).send(`Successfully created suspicious entry with [${susWord}]`);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: suspicious - post (Path: '/:susWord') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

module.exports = suspiciousRouter;