#!/bin/sh

echo "Removing dependencies...\n\n If there is any persmission issue, use sudo "


cd client && rm -rf node_modules/ dist/ && cd -
cd ID_microservice_1 && rm -rf node_modules/ dist/ && cd -
cd AUTH_microservice_2 && rm -rf node_modules/ dist/ && cd -


echo "\n\nDependency removal finished."