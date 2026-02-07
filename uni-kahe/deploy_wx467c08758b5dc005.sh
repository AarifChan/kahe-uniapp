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
tar -czvf ./mp-weixin.tar.gz dist/build/mp-weixin/
scp ./mp-weixin.tar.gz jmcw:/home/aarif/wx467c08758b5dc005/mp/
ssh jmcw "/home/aarif/wx467c08758b5dc005/mp/run-mp.sh"
rm -rf ./mp-weixin.tar.gz
