# Express + TypeScript + Node.js + Drizzle ORM + PostgreSQL

## Commands

### Install dependencies
`npm install`

### Start server in development
`npm run dev`

### Start PostgreSQL with Docker
```
cd dev
docker-compose up -d
```

### Drizzle ORM migrations
```
npx drizzle-kit generate:pg
npx drizzle-kit push
```
