'use strict';
const WebSocket = require("ws");

const bc = require("./blockchain");

const p2p_port = process.env.P2P_PORT || 6001;

const MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};

var sockets = [];

function getSockets() { return sockets; }

function initP2PServer() {
    const server = new WebSocket.Server({ port: p2p_port });
    server.on("connection", function (ws) { initConnection(ws); });
    console.log("Listening websocket p2p port on: " + p2p_port);
}

function initConnection(ws) {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
}

function initMessageHandler(ws) {
    ws.on("message", function (data) {
        const message = JSON.parse(data);
        // console.log("Received message" + JSON.stringify(message));

        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleBlockchainResponse(message);
                break;
        }
    });
}

function initErrorHandler(ws) {
    ws.on("close", function () { closeConnection(ws); });
    ws.on("error", function () { closeConnection(ws); });
}

function closeConnection(ws) {
    console.log("Connection failed to peer: " + ws.url);
    sockets.splice(sockets.indexOf(ws), 1);
}

function connectToPeers(newPeers) {
    newPeers.forEach(
        function (peer) {
            const ws = new WebSocket(peer);
            ws.on("open", function () { initConnection(ws); });
            ws.on("error", function () { console.log("Connection failed"); });
        }
    );
}

function handleBlockchainResponse(message) {
    const receivedBlocks = JSON.parse(message.data);
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    const latestBlockHeld = bc.getLatestBlock();

    if (latestBlockReceived.header.index > latestBlockHeld.header.index) {
        console.log(
            "Blockchain possibly behind."
            + " We got: " + latestBlockHeld.header.index + ", "
            + " Peer got: " + latestBlockReceived.header.index
        );
        if (bc.calculateHashForBlock(latestBlockHeld) === latestBlockReceived.header.previousHash) {
            // A received block refers the latest block of my ledger.
            console.log("We can append the received block to our chain");
            if (bc.addBlock(latestBlockReceived)) {
                broadcast(responseLatestMsg());
            }
        }
        else if (receivedBlocks.length === 1) {
            // Need to reorganize.
            console.log("We have to query the chain from our peer");
            broadcast(queryAllMsg());
        }
        else {
            // Replace chain.
            console.log("Received blockchain is longer than current blockchain");
            bc.replaceChain(receivedBlocks);
        }
    }
    else { console.log("Received blockchain is not longer than current blockchain. Do nothing"); }
}

function queryAllMsg() {
    return ({
        "type": MessageType.QUERY_ALL,
        "data": null
    });
}

function queryChainLengthMsg() {
    return ({
        "type": MessageType.QUERY_LATEST,
        "data": null
    });
}

function responseChainMsg() {
    return ({
        "type": MessageType.RESPONSE_BLOCKCHAIN,
        "data": JSON.stringify(bc.getBlockchain())
    });
}

function responseLatestMsg() {
    return ({
        "type": MessageType.RESPONSE_BLOCKCHAIN,
        "data": JSON.stringify([bc.getLatestBlock()])
    });
}

function write(ws, message) { ws.send(JSON.stringify(message)); }

function broadcast(message) {
    sockets.forEach(function (socket) {
        write(socket, message);
    });
}

module.exports = {
    connectToPeers,
    getSockets,
    broadcast,
    responseLatestMsg,
    initP2PServer
};
