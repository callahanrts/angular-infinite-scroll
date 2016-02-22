#!/bin/bash

npm run uglify
git add -A
git commit -m "minify"

if [ -z "$1" ];then
  git push origin master
else
  npm run tag $1
  git push origin master --tags
fi

