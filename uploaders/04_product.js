const fs = require('fs');
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('CSV_Product.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    // remove the first line: header
    csvData.shift();
    // connect to the PostgreSQL database
    // save csvData
  });
stream.pipe(csvStream);

const Pool = require('pg').Pool;
// remove the first line: header
csvData.shift();
// create a new connection pool to the database
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
});
const query =
  'INSERT INTO products (name, description,category_id, purchase_method_id) VALUES ($1, $2,$3,$4)';
pool.connect((err, client, done) => {
  if (err) throw err;
  try {
    csvData.forEach((row) => {
      setTimeout(() => {
        client.query(query, row, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log('inserted ' + res.rowCount + ' row:', row);
          }
        });
      }, 300);
    });
  } finally {
    done();
  }
});

console.log('done');
