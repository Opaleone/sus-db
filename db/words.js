const { Suspicious, Responses } = require('../src/models');
const { db } = require('../db/connection');
const { susWords, susPhrases } = require('../wordsAndPhrases.json');

(async function() {
  try {
    await db.sync();
    console.log(`[LOADING] Adding ${susWords.length} words and ${susPhrases.length} phrases`);

    for (const word of susWords) {
      await Suspicious.create({
        word: word
      })
    }

    for (const phrase of susPhrases) {
      await Responses.create({
        phrase: phrase
      })
    }

    console.log(`[SUCCESS] Added ${susWords.length} words and ${susPhrases.length} phrases`)
  } catch(e) {
    console.log('[FAILED] Could not add words and phrases');
    console.log(e.message);
  }
})();