# Knees Weak Arms Heavy

## Introductions

### App and Group Brief

### Bryce

Hello everyone. We'll talk about our project in a minute here but first we'll introduce ourselves.

I'm Bryce, I started programming while I was in engineering at UVic, and I've found it more fulfilling than the jobs I've had since, so this program seemed like a good next step for me.

### Jon

Hi, I'm Jon. I completed a degree in math from Queen's university, and have been teaching math since as a job and programming as a hobby, and I decided to go to the lighthouse labs bootcamp to move into a web development career.

### Wilson

Hello, I'm Wilson. I have degree in Computer Engineering from UVic and pivoted to web development after that, where I worked as a dev for a little while. I'm always interested learning in new web technologies to put to good use.

## App Explanation

### Intro (Bryce)

Our project is TraderU, a stock and cryptocurrency trading simulator. We'll go into details about the tools and techniques used towards the end of the presentation.

Let's try it out.

### Demo

<!-- Wilson as Narrator, Bryce as User -->

## Viewing as Guest

<!-- Trim, very brief statements, with pause between -->

1. Info (Landing page, introduction to app), dark mode (Fully toggle-able, on every page, for sore eyes.)
2. Assets (We'll talk more about this later), filter (Filter stocks based on both name and ticker symbol simultaneously)
3. Leaderboard (We have a leaderboard showing who's the Warren Buffet of stock simulations. Let's go to our portfolios now.)
4. Portfolios (But we're not logged in, so let's login and see what other features we have.)

<!-- Jon as Narrator, Bryce as User -->

## Viewing as Power User

<!-- Trim, very brief statements, with pause between -->

1. Login (show hamburger menu)
2. Navigate to portfolios
3. Open top portfolio, scroll through graphs (pie => value => rank)
4. Brief mention of public/notifications
5. Open second portfolio, have it be all cash
6. Navigate to assets
7. Buy 2000 Ford
8. Back to portfolios.
9. Look at updated portfolio pie graph.
10. Hand off

<!-- Wilson -->

### Vue Suite

On the front end we used...

<!-- Jon -->

### API Interaction, Back End

On our backend we used node, express and postgres, and learned typescript to code in. For our data we integrated a stock and cryptocurrency API called alpha vantage, and learned a lot about pstgres and jsonb for storing the large amounts of data.

<!-- Bryce -->

### Devops Stuff / Styling

For deployment we used an AWS Pipeline, so as soon as we push to master we a build and test process, and if it passes it deploys to an EC2 instance through Elastic Beanstalk and we get a nice couple of cute badges to show our test coverage and build status. For styling, we made custom components and used Sass mixins for our visual effects.

## Closing Remarks

### Bryce

There a few features we didn't have time to get to, mainly trade limits and durations, as well as options trading.

### Wilson

Thank you for checking out our app. If you thought the app was interesting ask us about all the extra features we have in our session!

### Jon

Thanks everyone.
