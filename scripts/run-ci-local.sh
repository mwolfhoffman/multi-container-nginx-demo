#!/bin/bash          

BUILDID="build-$RANDOM"
INSTANCE="travisci/ci-garnet:packer-1512502276-986baf0"
docker run --name $BUILDID -dit $INSTANCE /sbin/init
docker exec -it $BUILDID bash -l
