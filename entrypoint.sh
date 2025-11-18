echo "▶️ Running migrations..."
npm run migration:run

echo "🌱 Running seeders..."
npm run seed-gcp:all

echo "🚀 Starting app..."
node dist/main
