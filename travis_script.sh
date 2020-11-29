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

profiling() {
	cd "backend" || return 127

	#Start app in background
	node --prof index.js &
	#Save the process id on the background
	APP_PID=$!

	echo "[LOG] Profiling"

	curl -X GET "http://localhost:${PORT}/api/qwertyuiop/users"
	curl -X GET "http://localhost:${PORT}/api/items"
	echo $(ab -k -c 20 -n 20 "http://localhost:${PORT}/api/qwertyuiop/users" | grep -A11 'Concurrency Level')
	echo $(ab -k -c 20 -n 20 "http://localhost:${PORT}/api/items" | grep -A11 'Concurrency Level')

	#Kill the node process once all checks have been done
	kill ${APP_PID}

	#Read the profile results and export them to text format
	node --prof-process isolate-0x*-v8.log > profiling.log

	#Grep the summary
	echo $(grep -A5 '[Summary]' profiling.log)

	#Clean up
	rm isolate-0x*-v8.log profiling.log

	cd ..
}

# [IMPORTANT] Don't uncomment front_tests if there are no tests for the frontend
# 			  because npm test will fail and stop the continuous integration process
FRONT_TESTS_RESULT=0
#front_tests
back_tests
# QA tests and performance checks
profiling

if [ $FRONT_TESTS_RESULT -eq 0 ] && [ $BACK_TESTS_RESULT -eq 0 ]; then
	exit 0
fi

exit 127
