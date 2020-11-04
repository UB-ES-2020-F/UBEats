#!/bin/bash

psql -f setup_database.sql -U postgres
DDBB_EXIT_CODE=$?
echo "[LOG] Database creation exit code: ${DDBB_EXIT_CODE}"
exit ${DDBB_EXIT_CODE}
