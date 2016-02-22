#!/bin/bash

git tag -a v$1 -m "Release version $1"
git push origin master --tags
