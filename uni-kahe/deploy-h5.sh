#!/bin/bash

git pull
node -v
npm -v
yarn -v
rm -rf dist/build
yarn install
yarn build:h5
yarn upload-images
yarn replace-h5-cdn
tar -czvf ./h5.tar.gz dist/build/h5/
scp ./h5.tar.gz jmcw:/home/aarif/kahe/kahe-h5/
ssh jmcw "/home/aarif/kahe/kahe-h5/run-web.sh"
