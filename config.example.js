module.exports = {
  hostname: '', //hostname for link shortener
  db: {
    user: '', // postgres user
    host: '', // postgres host
    database: '', // db name
    password: '', // db user password
    port: 5432, // db port
    capSQL: true, // capitalize queries
  },
  daily: {
    min: 0,
    max: 10,
  },
  taxes: {
    guild: 0.1,
    global: 0.2,
  },
};
