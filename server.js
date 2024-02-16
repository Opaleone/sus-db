const { app } = require('./src/app');
const { db } = require('./db/connection');
const config = require('./config.json')

app.listen(config.PORT, () => {
  db.sync();
  console.log(`Listening at ${config.baseUrl}${config.PORT}`);
})