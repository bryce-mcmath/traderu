import db from '../index';

interface Return {
  rows: object[];
}
  
db.query(`
  select * from crypto_histories
`).then((data: Return) => {
  console.log(data.rows)
})