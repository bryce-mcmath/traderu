# List of Features

In no particular order:

- If a user doesn't have a gravatar when they register, their avatar will be a random character from the Big Short
- If they do have a gravatar, their profile will use that
- Geolocation API data pulled when users register if they agree to it, otherwise defaults to Victoria latitude and longitude (for later leaderboard use)
- History API used so front end "routes" mimicked with Vue Router show up in the browser and can be navigated through as you would a plain site, only way faster
- Caching and lazy-loading non-essential components
- PWA
  - Installable
  - Service worker uses sockjs to periodically check for updates and connection
  - Valid webmanifest which displays a nice splash screen with our logo before serving the app like a native app if you add it to your home screen (on Android at least, that's all I've tested)
  - Offline use without crashing (can't make trades etc. until you have an internet connection ofcourse)
  - App-like UI
  - Only missing SSL/HTTPS currently
- JWT and BCrypt for more secure authentication
- Neumorphic design
- Initial dark mode set based on detected user preference
- App Functionality:

  Guests can:

  - View landing page
  - View assets page
  - View individual assets
  - Search individual assets
  - Adjust time span of graph data
  - View the leaderboard, toggle dark mode
  - Register and create an account
  - Install the app to their mobile device

  Users can:

  - All the above
  - Create new portfolios
  - Delete portfolios
  - View portfolio statistics, breakdown, data viz
  - Select sections of their portfolio breakdown for more info
  - Buy and sell stocks, and see their portfolio updated accordingly
  - Buy and sell cryptocurrencies, and see their portfolio updated accordingly
  - Rise and fall in the leaderboard

- Monolithic repo
- Run varied subdirectory build, test, jsdoc steps with singular commands from the root with Lerna setup
- JSDoc setup so documentation can be generated from our comments (we only really used this in the server so far)
- Hot reload TypeScript server with ts-node and some other helpers
- Strict mode TS in server so we indeed used the real thing
- Tons of custom TS interfaces used
- Custom authentication middleware for DRY code and easy protected routes
- Sass mixins for building cool styles once, and easily using them a bajillion times
- Sass variables for quickly trying out different fonts, colors, etc. across the entire app
- D3 utils files for reusable graphing functions
- Postgres JSONB capabilites used to load more data faster and have all the benefits of MongoDB while maintaining a RDB structure
- AWS Pipeline and automated build and test process with email notifications and others bells and whistles
- Codecov watch reports
- Custom icons, favicons, logo done in Adobe Photoshop
- Mockups that were following pretty closely done in Adobe XD
- Project wiki and kanban board on github page
- Automated scripts to seed the database with new data without going over free API usage
- Cloud DB w/ ElephantSQL
- Entity Relationship Diagram (ERD) with color coded relationships and modular design
- Yet to be used table columns for future features (buying power etc.)
- Async/Await + try catch ES6+ pattern in routes
- Custom-made reusable components with options as props (the dark mode toggle is the same component as the settings toggles with different props passed in)
- Tons of lerna, babel, ts, vue, jest, prettier, and jsdoc configuration setup to get everything playing nice with eachother

We got to learn a ton of stuff that was not taught to us very quickly in a very short span of time
