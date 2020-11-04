#!/bin/bash

front_tests() {
	cd "frontend" || return 127
	echo "[LOG] Executing frontend tests"
	npm test
	FRONT_TESTS_RESULT=$?
	echo "[LOG] Frontend tests exit code: ${FRONT_TESTS_RESULT}"
	cd ..
	return $FRONT_TESTS_RESULT
}

back_tests() {
	cd "backend" || return 127
	echo "[LOG] Executing backend tests"
	npm test
	BACK_TESTS_RESULT=$?
	echo "[LOG] Backend tests exit code: ${BACK_TESTS_RESULT}"
	cd ..
	return $BACK_TESTS_RESULT
}

# [IMPORTANT] Don't uncomment front_tests if there are no tests for the frontend
# 			  because npm test will fail and stop the continuous integration process
FRONT_TESTS_RESULT=0
#front_tests
back_tests

if [ $FRONT_TESTS_RESULT -eq 0 ] && [ $BACK_TESTS_RESULT -eq 0 ]; then
	exit 0
fi

exit 127
