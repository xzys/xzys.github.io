---
layout: post
title: origami tooling
desc: Exploring options for visualizing origami
num: 5
---

# Introduction

Exploring ideas in combining origami and programming.
Ideally we will be able to create animations of origami _diagrams_.
The simulator by @amandaghassaei looks really nice, but it's not very useful for
origami beginners. Diagrams are much easier to follow along and can be consumed
by a wider audience.

# Previous Works

Doing a brief search for origami related projects on the internet

- 3D simulator using physics https://github.com/amandaghassaei/OrigamiSimulator
  - this folds an entire crease pattern at once by adding the folds (?) and
    resolving stresses
- More modest simulator in python https://github.com/takumif/origami 
  - 7 years old, but simpler 1000 line python script, let's start here
- Robert Lang also has a JS library for origami: https://rabbitear.org/docs/

# Takumi Origami Setup

cloned repo
installed python2.7.9 from installer
installed vpython 6.05 from installer

current vpython is 7 and uses glowscript to render graphics in JS
VPython6 uses TCL to open a native window

Got the app to work. however, you can't see it here because this only shows my
terinal.

> add screenshot / video

Diagrams are stored in an XML format
we are able to step through diagrams with some nice animations

# TODO

- port takumif/origami to web





