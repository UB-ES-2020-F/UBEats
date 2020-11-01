#!/bin/sh

cd frontend && npm install && npm run build && cd ..
cd backend && npm install && cd ..
