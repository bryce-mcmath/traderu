# Knees Weak Arms Heavy

## Introductions

### App and Group Brief

### Bryce

Hello everyone. We'll talk about our project in a minute here but first we'll introduce ourselves.

I'm Bryce, I started programming while I was in engineering at UVic, and I've found it more fulfilling than the jobs I've had since because I get to build things.

### Jon

Hi, I'm Jon. I completed a degree in math from Queen's university, and have been teaching math since as a job and programming as a hobby, and I decided to go to the lighthouse labs bootcamp to move into a web development career.

### Wilson

Hello, I'm Wilson. I'm a graduated from UVic as an engineer and pivoted to web development after, where I worked as a dev for three years.

## App Explanation

### Intro (Bryce)

Our project is TraderU, a stock and cryptocurrency trading simulator. We'll go into details about the tools and techniques used towards the end of the presentation.

Let's try it out.

### Demo

<!-- Wilson as Narrator, Bryce as User -->

## Viewing as Guest





<!-- Jon as Narrator, Bryce as User -->

## Viewing Power User






<!-- Wilson -->

### Vue Suite

Our front-end was built using the entire Vue suite, including Vuex (equivalent to Redux), Vuetify, and Vue Router (equivalent to React Router), utilizing the History API with Vue Router. All of our data and app actions are in our Vuex store, which makes it easy to access state from anywhere. To fetch this data, we rely on AJAX calls to the API routes of our server.

<!-- Jon -->

### API Interaction, Back End

For the backend, our main data source was an API called AlphaVantage API which we use for our stock and cryptocurrency data. To store the massive amounts of data we need, we learned to use the JSONB capabilities of Postgres. To limit our API usage, we pull the data once a day and query our own database when we need to update the app. I wrote timed scripts to do so. -> Bryce, deployment and project structure

<!-- Bryce -->

### Devops Stuff / Styling

- Show ERD
- Show AWS Console
- Test Suites and Codecov
- Lerna Commands
- Sass Mixins for theme and mode

## Closing Remarks

### Bryce

There a few features we didn't have time to get to, mainly trade limits and durations, as well as options trading.

### Wilson

Thank you for checking out our app. We don't have time to cover everything we did, but we'd love to talk to you about it more after the presentations are over.

### Jon

Thanks everyone. We would love to talk to you after the presentations to talk about our app and answer any questions
