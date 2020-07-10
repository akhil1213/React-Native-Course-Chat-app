var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://ukegfydr:80YWjjZbHEOE78IKWDLUrnA5WP7alCvu@ruby.db.elephantsql.com:5432/ukegfydr" //Can be found in the Details page
var client = new pg.Client(conString);

var knex = require('knex')({
    client: 'pg',
    connection: conString,
    searchPath: ['knex', 'public'],
});
console.log(knex)
console.log(knex.select('profName', 'classname', 'time').from('Class'))


// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT * from Class', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result);
//     // >> output: 2018-08-23T14:02:57.117Z
//     // client.end();
//   });
//   client.query("INSERT INTO Class (id,profName,coursename,time) VALUES ('1',\
//   'Akhil Khanna','React-234', '01:30 PM'); ", (err,result)=>{
//         if(err){
//             return console.error('error',err)
//         }
//         console.log(result)
//         client.end()
//   })
// });
// export default client
// CREATE TABLE Class (
//     id varchar(255),
//     profName varchar(255),
//     courseName varchar(255),
//     time varchar(10)
// );
