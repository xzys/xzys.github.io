---
layout: post
title: todo.txt outline
desc: An extension to todo.txt for outlines
num: 5
---

[todo.txt](https://github.com/todotxt/todo.txt) is a way of organizing your tasks by plain text files.

[todo.sh](https://github.com/todotxt/todo.txt-cli) is a way to manage such files from the command line. 

`outline` is a extension to the `todo.sh` tool that converts outlines into the `todo.txt` format, using indents to imply
either dependency or inheritance relationships.

It converts this:

```
+meta
  (A)
    +syncing-bug
      get rid of desync table 
      add desynced tasks to bottom of outline file

  fix mismatch bug for tasks with same text

  +outline
    combine outline format for applying tags/contexts AND a dependency graph
      parse outline files
      set up graphql w/ sqlite

    use graphene to set up an interface to graphql database due:2018-04-19
      set up schema for todo.txt format
      set up resolvers for actions
        parse outlines to graphql
          parser for todo.txt format
          track dependency and inheritance relationships based on indent
        write graphql tasks to todo.txt file
      
    sync database with changes to tasks on update
      keep track of desynced tasks and ignore them in the future
      removed archived tasks
  
  +manage
    write df command to do tasks from specific files
    write lf command to list tasks from specific files
    update archive command to archive from all files
```

to this (completed tasks have an `x` before them):

```
(A) +meta +syncing-bug get rid of desync table
(A) +meta +syncing-bug add desynced tasks to bottom of outline file
+meta fix mismatch bug for tasks with same text
x +meta +outline set up graphql w/ sqlite
x +meta +outline write graphql tasks to todo.txt file due:2018-04-19
x +meta +outline removed archived tasks
x +manage +meta write df command to do tasks from specific files
x +manage +meta write lf command to list tasks from specific files
x +manage +meta update archive command to archive from all files
```

I use `outline` and (and other `todo.txt` scripts) to organize my projects, goals, links, and other aspects of my daily
life.

- **Repository**: [bitbucket](https://bitbucket.org/sachinrudr/todo.actions.d/src) (warning: no README)
- **Stack**: GraphQL, SQLite, python, graphene (python)

&nbsp;

TODO: clean up, write more detailed explanation
