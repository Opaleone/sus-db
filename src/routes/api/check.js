const express = require('express');
const checkRouter = express.Router();
const fs = require('fs')

const { Check } = require('../../models/Check');

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

checkRouter.get('/:checkId', async (req, res, next) => {
  const { checkId } = req.params;

  try {
    const getCheck = await Check.findByPk(checkId);

    if (!getCheck) {
      throw new Error(`No check with id of ${checkId}`);
    }

    res.status(200).json(getCheck);
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: check - get (Path: '/:checkId') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log');
  }
})

checkRouter.post('/check', async (req, res, next) => {
  try {
    await Check.create({
      ...req.body
    })

    res.status(200).send(`[SUCCESS] Check with id ${checkId} successfully created`);
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