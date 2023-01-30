import {SIZE_BLOCK, COLUMNS, ROWS} from "../index.js";

export class View {
    constructor (container) {
        this.container = container;
        this.preview();
    }

    colors = {
        J: '#7947F7',
        I: '#57E126',
        O: '#29D2DD',
        L: '#FF2F5D',
        2: '#F1F747',
        T: '#F7A547',
        S: '#C5F747',
    };
    
    canvas = document.createElement('canvas');

    context = this.canvas.getContext('2d');

    preview () {
        const howToStartMsg = document.createElement('div');
        const howToPlayMsg = document.createElement('div');

        howToPlayMsg.classList.add('preview');
        howToPlayMsg.innerHTML = `Press <b>Enter</b> to start a game <br> <b>Rotate</b> tetrominos using the <b>Up Arrow</b> key.
            <br> <b>Move</b> tetrominos using the <b>Left, Right, Down Arrow</b> keys.`;
        document.getElementsByTagName("body")[0].appendChild(howToPlayMsg);

    }
    
    init() {
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.width = SIZE_BLOCK * COLUMNS;
        this.canvas.height = SIZE_BLOCK * ROWS;
    }  

    showArea (area) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < area.length; y++){
            const line = area[y];
    
            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block !=='o') {
                    this.context.fillStyle = this.colors[block];
                    this.context.strokeStyle = 'white';
                    this.context.fillRect(x * SIZE_BLOCK, y*SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    this.context.strokeRect(x * SIZE_BLOCK, y*SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                }            
            }
        }
        
    }
}