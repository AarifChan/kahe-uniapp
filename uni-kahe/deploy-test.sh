#!/bin/bash

git pull
node -v
npm -v
yarn -v
rm -rvf dist/build
yarn install
yarn build:mp-weixin
#yarn upload-images
yarn replace-cdn
tar --disable-copyfile -czvf ./mp-weixin.tar.gz dist/build/mp-weixin/
scp ./mp-weixin.tar.gz jmcw:/home/aarif/jmcw/wx_ma_2/
ssh jmcw "/home/aarif/jmcw/wx_ma_2/run-mp.sh"
#rm -rf ./mp-weixin.tar.gz
