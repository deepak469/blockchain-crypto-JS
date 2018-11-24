const SHA256 = require('crypto-js/sha256')

class Block{

    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index+ this.previousHash + this.timestamp+ JSON.stringify(this.data)).toString() ;
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash(); 
        this.chain.push(newBlock);
    }

    chainValid(){
        for(let i=1;i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.previousHash !== previousBlock.hash){
                console.log("1");
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log("2");
                return false;
            }
            console.log("3");
        }
        return true;
    }
}

let newCoin  = new Blockchain();
newCoin.addBlock(new Block(1, "02/02/2018", {amount: 4}));
newCoin.addBlock(new Block(2, "03/03/2018", {amount: 9}));

console.log(JSON.stringify(newCoin, null, 4));

console.log("is Blockchain Valid "+ newCoin.chainValid());
newCoin.chain[1].data = {amount : 7};
newCoin.chain[1].hash = newCoin.chain[1].calculateHash();
//if one block adjusted we need to modify all
//newCoin.chain[2].previousHash = newCoin.chain[1].hash;
//newCoin.chain[2].hash = newCoin.chain[2].calculateHash();
console.log("is Blockchain valid "+newCoin.chainValid());
