#!/bin/bash

git pull
node -v
npm -v
yarn -v
rm -rvf dist/build
yarn install
yarn build:mp-weixin
yarn upload-images
yarn replace-cdn
tar --disable-copyfile -czvf  ./mp-weixin.tar.gz dist/build/mp-weixin/
scp ./mp-weixin.tar.gz jmcw:/home/aarif/kahe/kahe-mp/
ssh jmcw "/home/aarif/kahe/kahe-mp/run-mp.sh"
rm -rf ./mp-weixin.tar.gz
