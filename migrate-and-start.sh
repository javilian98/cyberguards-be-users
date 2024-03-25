#!/usr/bin/env bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev