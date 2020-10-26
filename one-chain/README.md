## 1. Install Node.js
## 2. Install curl
(1) Check CPU architecture
```Shell
$ echo %PROCESSOR_ARCHITECTURE%
```
(2) Download and Install the suitable `curl` for CPU architecture
```
$ curl --version
```
(3) Clone `onechain` repository
(4) Install `dependencies` in `onechain` repository
```Shell
cd onechian
npm install
```
(5) Start node
```
npm start
```
(6) Check one-chain version and Terminate node
```
curl http://127.0.0.1:3001/version
curl -X POST http://127.0.0.1:3001/stop
```

(7) test
```
curl http://localhost:3001/blocks | python -m json.tool  // GET ledger

curl -H "Content-type:application/json" --data "{\"data\" : [\"Add block\", \"POST data\"]}" http://localhost:3001/mineBlock

curl -X POST http://127.0.0.1:3001/mineBlock

```