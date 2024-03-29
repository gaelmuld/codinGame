/**
 * GAME
 */
class Cell {
    constructor([index, richness, neigh0, neigh1, neigh2, neigh3, neigh4, neigh5]) {
        this.index = index;
        this.richness = richness;
        this.neigh0 = neigh0;
        this.neigh1 = neigh1;
        this.neigh2 = neigh2;
        this.neigh3 = neigh3;
        this.neigh4 = neigh4;
        this.neigh5 = neigh5;
        this.richVal = (richness - 1) * 2;
    }
    neighs() {
        return [this.neigh0, this.neigh1, this.neigh2, this.neigh3, this.neigh4, this.neigh5];
    }
    infos() {
        return`Tuile ${this.index}
Richesse ${this.richness} => ${this.richVal}
Tuiles proches ${this.neighs()}`
    }
}
class Info {
    constructor([day, nutrients, numTrees]) {
        this.day = day;
        this.nutrients = nutrients;
    }
}
class Tree {
    constructor([pos, size, isMine, isDormant]) {
        this.pos = pos;
        this.size = size;
        this.isMine = isMine;
        this.isDormant = isDormant;
    }
}
class Tips {
    constructor(listMoves) {
        this.act = listMoves;
    }
}
class Player {
    constructor([sun, score, isWaiting = null]) {
        this.sun = sun;
        this.score = score;
        this.isWaiting = isWaiting;
    }
}
class Game {
    constructor(table, info, trees, players, tips) {
        this.table = table;
        this.info = info;
        this.trees = trees;
        this.players = players;
        this.tips = tips
    }
}
const numberOfCells = parseInt(readline()); // 37
let table = [];
for (let i = 0; i < numberOfCells; i++) {
    table.push(new Cell(readline().split(' ')));
    /*  const index = parseInt(inputs[0]); // 0 is the center cell, the next cells spiral outwards
     const richness = parseInt(inputs[1]); // 0 if the cell is unusable, 1-3 for usable cells
     const neigh0 = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
     const neigh1 = parseInt(inputs[3]);
     const neigh2 = parseInt(inputs[4]);
     const neigh3 = parseInt(inputs[5]);
     const neigh4 = parseInt(inputs[6]);
     const neigh5 = parseInt(inputs[7]); */
}

// game loop
while (true) {
    let game;
    let info;
    let players = [];
    let trees = [];
    let tips = [];
    const day = parseInt(readline()); // the game lasts 24 days: 0-23
    const nutrients = parseInt(readline()); // the base score you gain from the next COMPLETE action
    info = new Info([day, nutrients]);
    players[0] = new Player(readline().split(' '));
    /* const sun = parseInt(inputs[0]); // your sun points
    const score = parseInt(inputs[1]); // your current score */
    players[1]=new Player(readline().split(' '));
    /* const oppSun = parseInt(inputs[0]); // opponent's sun points
    const oppScore = parseInt(inputs[1]); // opponent's score
    const oppIsWaiting = inputs[2] !== '0'; // whether your opponent is asleep until the next day */
    const numberOfTrees = parseInt(readline()); // the current amount of trees
    for (let i = 0; i < numberOfTrees; i++) {
        trees.push(new Tree(readline().split(' ')));
        /* const cellIndex = parseInt(inputs[0]); // location of this tree
        const size = parseInt(inputs[1]); // size of this tree: 0-3
        const isMine = inputs[2] !== '0'; // 1 if this is your tree
        const isDormant = inputs[3] !== '0'; // 1 if this tree is dormant */
    }
    const numberOfPossibleMoves = parseInt(readline());
    for (let i = 0; i < numberOfPossibleMoves; i++) {
        tips.push(new Tips(readline()));
    }
    game=new Game(table,info,trees,players,tips)
    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>
    console.log('COMPLETE '+ bestTrees(trees).pos);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function bestTrees(trees) {
    return [...trees].filter(x => x.isMine === '1').sort((x, y) => x.pos < y.pos)[0];
}
