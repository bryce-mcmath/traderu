# Notes

## Git Commit Message Formatting

Hey fellas. I think we should try to have a decent commit history on this project for a couple reasons. One, we have to work remote cause of this beervirus nonsense so we can just turn to our left and ask each other what the hell we're doing. Good commits will make that easier to figure out on our own. Two, people might actually look at this repo, and it probably won't make a good impression if all our commits are like "did stuff" and it's 20,000 lines of code. But I have a way to make this way easier for us.

### Step by Step Setup

1. `code ~/.gitmessage.txt`
2. Add the following to it:

```
#|-----------------------------------------------|
Subject line try to keep under 50 characters) ^

#|---------------------------------------------------------------------|
# Multi-line description of commit, under 72 characters per line ^

What:

1) Thing you did #1
2) Thing you did #2

Why:

1) Why you did thing #1
2) Why you did thing #2

# Use "make" tense, not "made" or "makes" or "making" in subject line
# This file is located at ~/.gitmessage.txt
```

3. `code ~/.gitconfig`
4. Add the following to it, if it isn't there already:

```
[user]
	name = YOUR_NAME
	email = YOUR_EMAIL
[github]
	user = YOUR_GITHUB_USERNAME
[commit]
	template = ~/.gitmessage.txt
```

5. Now rejoice! Simply use `git commit` rather than `git commit -m "Some lame msg"`

### Swagger

https://swagger.io

## Neumorphism

### Unpressed

#### Light

box-shadow: -5px 5px 10px #cecece,
5px -5px 10px #ffffff;

#### Dark

box-shadow: -5px 5px 10px #242424,
5px -5px 10px #303030;

### Pressed

#### Light

box-shadow: inset -5px 5px 10px #cecece,
inset 5px -5px 10px #ffffff;

#### Dark

box-shadow: inset -5px 5px 10px #242424,
inset 5px -5px 10px #303030;
