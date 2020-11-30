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

front_linting() {
	cd "frontend/src" || return 127

	echo "[LOG] Linting frontend"

	npx eslint ./

	cd ../..
}

back_linting() {
	cd "backend" || return 127

	echo "[LOG] Linting"

	#npx eslint ./
	npx eslint controllers services routes index.js helpers

	cd ..
}

profiling() {
	cd "backend" || return 127

	#Start app in background
	NODE_ENV=production node --prof index.js &> node_execution.log &
	#Save the process id on the background
	APP_PID=$!
	echo "Spawned node prof with pid: ${APP_PID}"

	#ps aux | grep ${APP_PID}
	#ps aux | grep node
	#sudo netstat -lntu --program

	#docker_address_port=$(sudo netstat -lntu --program | grep docker | awk '{ print $4 '})
	#docker ps -a
	#docker top

	sleep 5 #wait for the app to be up

	echo "[LOG] Profiling"

	curl -vX GET "http://localhost:${PORT}/api/items"
	curl -vX GET "http://localhost:${PORT}/api/items"
	#echo $(ab -k -c 20 -n 20 "http://localhost:${PORT}/api/qwertyuiop/users" | grep -A11 'Concurrency Level')
	#echo $(ab -k -c 20 -n 20 "http://localhost:${PORT}/api/items" | grep -A11 'Concurrency Level')

	#Kill the node process once all checks have been done
	sleep 5 #wait for http request to complete
	kill ${APP_PID}
	cat node_execution.log

	#Read the profile results and export them to text format
	node --prof-process isolate-0x*-v8.log > profiling.log

	#Grep the summary
	#echo $(grep -A6 Summary profiling.log)
	grep -A6 Summary profiling.log

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
front_linting
back_linting
profiling

if [ $FRONT_TESTS_RESULT -eq 0 ] && [ $BACK_TESTS_RESULT -eq 0 ]; then
	exit 0
fi

exit 127
