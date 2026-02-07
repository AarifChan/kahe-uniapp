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
scp ./mp-weixin.tar.gz jmcw:/home/aarif/wxda6d1e99c884727e/mp
ssh jmcw "/home/aarif/wxda6d1e99c884727e/mp/run-mp.sh"
rm -rf ./mp-weixin.tar.gz
