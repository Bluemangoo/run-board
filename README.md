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
COPY election.package.json build/package.json
CD build
yarn install
```

### Election build
```
MKDIR build
ROBOCOPY dist build /E
CD build
yarn run build
```