# run-board

Set your id list at `App.vue > data() > idList`

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Election setup
```
MKDIR build
COPY election.package.json build/package.json
CD build
yarn install
```

### Election build
```
ROBOCOPY dist build /E
COPY main.js build/main.js
CD build
yarn run build
```