const express = require('express');
const userRouter = express.Router();
const fs = require('fs')

const { User } = require('../../models/User');

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) throw new Error('No Users found!');

    res.status(200).send({ users: users });
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: user - get (Path: '/') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

userRouter.get('/:userId/:userName', async (req, res, next) => {
  const { userId, userName } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const newUser = await User.create({
        userId: userId,
        userName: userName
      })

      res.send({ user: newUser });
    }

    res.send({ user: user })
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: user - get (Path: '/userId/userName') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

userRouter.post('/:userid/:userName', async (req, res, next) => {
  const { userId, userName } = req.params;

  try {
    const user = await User.create(
      {
        userId: userId,
        userName: userName
      }
    )

    res.status(200).send({ message: 'User created!'});
  } catch (e) {
    const todayDate = new Date().toJSON();
    const msg = `${todayDate}: ${e.message} :: user - put (Path: '/userId/userName') ::\n`;

    fs.appendFile('errors.log', msg, err => {
      console.log(err);
    })

    res.status(500).send('[FAILED] Check error log')
  }
})

module.exports = userRouter;