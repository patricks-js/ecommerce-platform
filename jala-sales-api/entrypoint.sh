#!/bin/sh

echo "Waiting for the database to be ready..."
until pg_isready -h jala-sales-db -p 5432 -U docker; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "Database is ready! Running migrations..."
npm run db:migrate

echo "Starting application..."
npm start
