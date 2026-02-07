#!/bin/bash

git pull
node -v
npm -v
yarn -v
rm -rf dist/build
yarn install
yarn build:mp-weixin
#yarn upload-images
yarn replace-cdn
rm -rf dist/build/mp-weixin/static
tar -czvf ./mp-weixin.tar.gz dist/build/mp-weixin/
scp ./mp-weixin.tar.gz jmcw:/home/aarif/kahe/kahe-mp-test/
ssh jmcw "/home/aarif/kahe/kahe-mp-test/run-mp.sh"
rm -rf ./mp-weixin.tar.gz
