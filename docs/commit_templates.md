# Notes

## Git Commit Message Formatting

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
