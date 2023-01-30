import { tetrominoes } from "./tetrominoes.js";
import {ROWS, COLUMNS} from "../index.js";

export class Game {
    area = [
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','o',],
    ];

    activeTetramino = this.createTetromino();

    nextTetramino = this.createTetromino();

    createTetromino() {
        const keys = Object.keys(tetrominoes);
        const letterTetromino = keys[Math.floor(Math.random() * keys.length)];
        const rotation = tetrominoes[letterTetromino];
        //const rotationIndex = 0;
        const rotationIndex = Math.floor(Math.random() * rotation.length);
        const block = rotation[rotationIndex];

        return {
            block,
            rotationIndex,
            rotation,
            x: 3,
            y: 0, 
        }
    }

    changeTetramino() {
        this.activeTetramino = this.nextTetramino;
        this.nextTetramino = this.createTetromino();
    }

    moveLeft() {
        if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
            this.activeTetramino.x -= 1;
        }
    }

    moveRight() {
        if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
            this.activeTetramino.x += 1;
        }
    }

    moveDown() {
        if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
            this.activeTetramino.y += 1;
        } else {
            this.stopMove();
        }
    }

    rotateTetramino() {
        this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex < 3 ?
            this.activeTetramino.rotationIndex + 1 : 0;
        
        this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex]

        if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
            this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex > 0 ?
            this.activeTetramino.rotationIndex - 1 : 3;
        
        this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex]
        }
    }

    get viewArea() {
        const area = JSON.parse(JSON.stringify(this.area));
        const {x, y, block} = this.activeTetramino;

        for (let i = 0; i < block.length; i++) {
            const row = block[i];
            for (let j = 0; j < row.length; j ++) {
                if (row[j] !=='o') {
                    area[y + i][x + j] = block[i][j];
                }
            }
        }

        return area;        
    }
    
    checkOutPosition(x, y) {
        const block = this.activeTetramino.block;

        for (let i = 0; i < block.length; i++) {            
            for (let j = 0; j < block[i].length; j ++) {
                if (block[i][j] === 'o') continue;

                if (!this.area[y + i] ||
                    !this.area[y + i][x + j] ||
                    this.area[y +i][x + j] !=='o'){
                    return false;
                }                    
            }
        }
        return true
    }
    
    stopMove() {
        const {x, y, block} = this.activeTetramino;

        for (let i = 0; i < block.length; i++) {
            const row = block[i];
            for (let j = 0; j < row.length; j ++) {
                if (row[j] !=='o') {
                    this.area[y + i][x + j] = block[i][j];
                }
            }
        }

        this.changeTetramino();
        this.clearRow();
    }

    clearRow(){
        const rows = [];

        for(let i = ROWS - 1; i >= 0; i--) {
            let countBlock = 0;

            for(let j = 0; j < COLUMNS; j++) {
                if (this.area[i][j] !== 'o') {
                    countBlock +=1;
                }
            }

            if (!countBlock) break;

            if (countBlock === COLUMNS) {
                rows.unshift(i)
            }
        }

        rows.forEach(i => {
            this.area.splice(i, 1);
            this.area.unshift(Array(COLUMNS).fill('o'))
        })
    }
}
