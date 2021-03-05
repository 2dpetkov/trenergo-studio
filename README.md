## Running the tests

### running with Docker Compose
To build
```
docker-compose build
```

Then run
```
docker-compose up
```

### node.js tests
The Mocha/Chai backend tests should be placed in *./test*

```
npm test
```

### browser tests
The Mocha/Chai frontend tests should be placed in *./browser_tests*.

Run by opening *./browser_tests/index.html* in a web browser.
