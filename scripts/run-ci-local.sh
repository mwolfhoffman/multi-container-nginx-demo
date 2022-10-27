#! /bin/bash

INSTANCE="travisci/ci-sardonyx:packer-1666165336-7c9fd3be"
BUILDID="build-$RANDOM"
# Download the image, it is relatively big 
docker run --name $BUILDID -dit $INSTANCE /sbin/init
# Enter the container
docker exec -it $BUILDID bash -l

su - travis
git clone https://github.com/mwolfhoffman/multi-container-nginx-demo.git
cd multi-container-nginx-demo

ls 