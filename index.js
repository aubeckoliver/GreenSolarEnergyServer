const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'Qwert12345',
    database : 'szoft'
  }
});

knex.select().table('people').then(console.log);

//knex.raw('select * from people;').then(console.log);
