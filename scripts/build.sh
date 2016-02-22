#!/bin/bash

npm run uglify
git add -A
git commit -m "minify"
npm run tag $0
