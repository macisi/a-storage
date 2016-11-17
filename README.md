# a-storage

[![NPM version](https://badge.fury.io/js/a-storage.svg)](http://badge.fury.io/js/a-storage)

a-storage is a simple storage library for JavaScript.

install width npm:

```sh
npm install --save a-storage
```

## Configuration

Typical Usage:

```js
import Storage, { DRIVERS } from 'a-storage';
const storage = Storage({
  dirver: DRIVERS.SESSIONSTORAGE
});
```

### driver

- Select the usage of particular driver.
- default: `LOCALSTORAGE`
- available drivers:

driver | description
--- | ---
`MEMORY` | Use JavaScript Object
`LOCALSTORAGE` | Use native localStorage
`SESSIONSTORAGE` | Use native sessionStorage
`DOMAINSTORAGE` | domainStorage provide by dingtalk

### Promise

- Provide your own `Promise` implement
- default: native `Promise` object
