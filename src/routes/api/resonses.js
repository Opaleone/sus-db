const express = require('express');
const responsesRouter = express.Router();
const fs = require('fs')

const { Responses } = require('../../models/');

responsesRouter.get('/', async (req, res, next) => {
  try {
    const allResponses = await Responses.findAll();

    if (!allResponses) {
      res.status(404).send('No responses found!')
    }

    res.status(200).json(allResponses);
  } catch(e) { 
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: responses - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

responsesRouter.post('/:susResponse', async (req, res, next) => {
  const { susResponse } = req.params;

  try {
    await Responses.create({
      phrase: susResponse
    })

    res.status(201).send(`[SUCCESS] Created response with [${susResponse}]`);
  } catch(e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: responses - post (Path: '/:susPhrase') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

module.exports = responsesRouter;