import db from './index';

const reset = () =>
	db
		.query(
      `
    DELETE from users;
		DELETE FROM portfolios;
		DELETE FROM stocks;
		DELETE FROM portfolios_stocks;
		DELETE FROM stock_histories;
		DELETE FROM stock_transactions;
    DELETE FROM portfolio_histories;
    INSERT into users(name, email, password_hash, avatar, latitude, longitude)
    VALUES ('Testington Userham', 'tu@gmail.com', '$2a$11$cdQ971X5dBXSOBHez2TIqevNGGEI4DZenRd/N5QF6WhvKnXkDl62u',
    '//www.gravatar.com/avatar/a17548ea579a54c180a7d37a7818501a?s=200&r=pg&d=mm', '48.428', '-123.365');
		`,
    )
//Just in case, because this query scares me.
//connection string based on BUILD_ENV, 
//so can only run on test db
if(process.env.BUILD_ENV === 'test'){
  reset();
}