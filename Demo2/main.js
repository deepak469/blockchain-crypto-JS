const SHA256 = require('crypto-js/sha256')

class Block{

    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index+ this.previousHash + this.timestamp+ JSON.stringify(this.data)+ this.nonce).toString() ;
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0") ){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(this.nonce);
        console.log("block mined: "+this.hash);
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty =3;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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
console.log("mining block 1");
newCoin.addBlock(new Block(1, "02/02/2018", {amount: 4}));
console.log("mining block 2");
newCoin.addBlock(new Block(2, "03/03/2018", {amount: 9}));

