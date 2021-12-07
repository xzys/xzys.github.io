---
layout: post
title: todo.txt outline 03/2021 UPDATE
desc: An extension to todo.txt for outlines
num: 8
---

[todo.txt](https://github.com/todotxt/todo.txt) is a way of organizing your tasks by plain text files.

[todo.sh](https://github.com/todotxt/todo.txt-cli) is a way to manage such files from the command line.

`outline` is a extension to the `todo.sh` tool that converts outlines into the
`todo.txt` format, using indents to imply either dependency or inheritance
relationships.



I've been using this tool for a few years now, and it works great.
It can serve as a simple organizing tool for task breakdowns and project
management.

A few additions have been made to the format over time.

1. First is the divider: `---`.
   Anything after the divider in an `*.ol.txt` file will be ignored.
   This is space for notes and a scratchpad for the outline.

2. Done tasks get collected into the global `done.txt` file in your `todo`
   repository.

3. Tasks now show their parenst in addition to themselves. This is to get around
   the issue of multiple tasks that may have the same 'raw' text. For example,
   consider the chapters in a textbook.

   ```
   Chemistry Essentials
      chapter 1-3 @read due:2029-02-20
      chapter 4-6 @read due:2029-03-05

   Mathematics for adults
      chapter 1-3 @read due:2029-02-20
      chapter 4-6 @read due:2029-03-05
   ```

   In this case, the tasks from the second book would marked as duplicates.
   Instead, we store each task as follows, which ensures that each task has
   unique raw text. It also gives some context to the task.
   ```
   task text; <parent task text>; ... @<contexts>... +<projects>...
   ```
   The information overload is a slight issue, but I find that I read the
   beginning and ending of lines more closely that the middles, so it's not much
   of a problem.


## Issues

- [ ] when finishing tasks, if the task is archived before `outline` is run
      again, we are adding it back to the `*.todo.txt` file. This can be worked
      around for the time being by completing and removing tasks from both the
      `todo` file and the `ol` file at once.


# Reference

- **Repository**: [bitbucket](https://bitbucket.org/sachinrudr/todo.actions.d/src) (warning: no README)
- **Stack**: GraphQL, SQLite, python, graphene (python)
