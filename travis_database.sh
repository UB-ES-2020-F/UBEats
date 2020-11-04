#!/bin/bash

psql -v ON_ERROR_STOP=ON -f setup_database.sql -U postgres
DDBB_EXIT_CODE=$?
echo "[LOG] Database creation exit code: ${DDBB_EXIT_CODE}"
exit ${DDBB_EXIT_CODE}
