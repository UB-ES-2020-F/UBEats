#!/bin/bash

front_install() {
	cd "frontend" || exit
	npm install && npm run build
	FRONT_INSTALL_RESULT=$?
	cd ..
}

back_install() {
	cd "backend" || exit
	npm install
	BACK_INSTALL_RESULT=$?
	cd ..
}

front_tests
if [ $FRONT_INSTALL_RESULT -e 0 ]; then
    back_tests
    if [ $BACK_INSTALL_RESULT -e 0 ]; then
        exit 0
    fi
fi

exit 127
