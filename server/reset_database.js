const { database, models } = require("./database");

async function reset() {
  await database.sync({ force: true })
  await database.close()
}

reset();
