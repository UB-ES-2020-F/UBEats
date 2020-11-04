#!/bin/bash

front_tests() {
	cd "frontend" || exit
	npm test
	FRONT_TESTS_RESULT=$?
	cd ..
}

back_tests() {
	cd "backend" || exit
	npm test
	BACK_TESTS_RESULT=$?
	cd ..
}

#front_tests
back_tests

if [ $FRONT_TESTS_RESULT -ne 0 ] || [ $BACK_TESTS_RESULT -ne 0 ]; then
	exit 127
fi

exit 0
