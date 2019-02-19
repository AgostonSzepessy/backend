# Installing
1. A `.env` file must be created with the following data:

```
DB_PASS="password"
DB_USER="movnetuser"
DB_HOST="127.0.0.1"
DB_NAME="movnet"
```

2. A user corresponding to the username and password that's in the `.env` file must be created in MySQL.

3. Create the database using `create_db.sql`.

4. `node-gyp` must be installed globally, along with a C++ compiler (required for argon2). The
compiler must either be
    * GCC >= 4.8
    * Clang >= 3.3
    * Visual Studio 2015 or newer

5. Run `npm install`

# Running
```
npm run dev
```

# Transpile to JS
```
npm run tsc
```
