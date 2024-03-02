#!/usr/bin/env bash
./wait-for-it.sh mysql:3307 -t 60
npx prisma generate
npx prisma migrate dev --name init
npm run test-local