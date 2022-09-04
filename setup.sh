#!/bin/sh

echo "Installing dependencies...\n\n"


cd client && yarn && cd -
cd ID_microservice_1 && yarn && cd -
cd AUTH_microservice_2 && yarn && cd -


echo "\n\nDependency installation finished."