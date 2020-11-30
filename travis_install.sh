#!/bin/bash

front_install() {
	cd "frontend" || return 127
	echo "[LOG] Installing the frontend"
	npm install
	# Fix this shit: https://github.com/validatorjs/validator.js/issues/1538
	mv node_modules/validator/validator.js node_modules/validator/index.js
	npm run build
	FRONT_INSTALL_RESULT=$?
	echo "[LOG] Frontend installed with exit code: ${FRONT_INSTALL_RESULT}"
	cd ..
	return $FRONT_INSTALL_RESULT
}

back_install() {
	cd "backend" || return 127
	echo "[LOG] Installing backend"
	npm install
	BACK_INSTALL_RESULT=$?
	echo "[LOG] Backend installed with exit code: ${BACK_INSTALL_RESULT}"
	cd ..
	return $BACK_INSTALL_RESULT
}

front_install
if [ $FRONT_INSTALL_RESULT -eq 0 ]; then
    back_install
    if [ $BACK_INSTALL_RESULT -eq 0 ]; then
        exit 0
    fi
fi

exit 127
