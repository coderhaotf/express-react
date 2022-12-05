## Node Full Stack Framework

### install

```bash
// install pnpm
npm install -g pnpm

// install project dependency
pnpm install
```

### backend

- express
- sequelize
- socket.io
- mysql2
- jsonwebtoken(jwt)
- ...

### fontend

- react
- react-router-dom
- antd
- react-redux
- @reduxjs/toolkit
- socket.io-client
- vite
- less
- axios
- typescript
- ...

### other

- pnpm
- pnpm-workspace
- nodemon
- yaml
- commitizen
- eslint

Prepare a framework (Frontend React/Vue; Backend: express/koa/any other framework with language that is commonly used for backend server) such that:

- Create a websocket channel (preferably socketio) for backend to populate data to frontend;
- Restful API for CRUD;
- Register a function to constantly modify data every several seconds, while not disturbing web services;
- (Bonus): connect to a database for persisting data;
- (Bonus): use a 3-tier structure (frontend + web server + application server);
- (Bonus): token-based authentication;
- (Bonus): use of TypeScript;
  You would need to modify this on the spot during on site test.
