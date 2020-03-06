# Recursive ESLint

Apparently you can do a recursive linting on the project, but I have conflicting reports about the syntax of the globbing:

First make sure ESlint is installed

```
npm i --save-dev eslint
eslint --init
echo 'node_modules' >> .eslintignore
```

From the root folder it is something like this:

`eslint --something '*/**/*.js'`

or maybe

```
eslint --something 'src/*.js'
then 'src','*','*.js'
then 'src','*','*','*.js'
then 'src','*','*','*','*.js'
```

I'm not really sure what the arguments are.

Then repeat for .json files as well

Note: this only works if you look for autofixable problems. It won't fix badly named variables etc.

It really doesn't matter as
- There are only a few files so we can easily open all of them and fix them
- Travis will pick up on any files that get pushed.
