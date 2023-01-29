const sizeBlock = 25;

// механика
const game = {
    area: [
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
        ['o','0','o','o','o','o','o','o','o','o',],
        ['o','o','o','o','o','o','o','o','o','x',],
        ['o','o','o','o','o','o','x','x','o','x',],
        ['x','x','x','x','o','o','x','x','x','x',],
    ],

    activeTetramino: {
        x: 3,
        y: 0, 
        block: [
            ['o', 'x', 'o'],
            ['o', 'x', 'o'],
            ['x', 'x', 'o'],
        ],
        rotationIndex: 0,
        rotation: [
            [
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
                ['x', 'x', 'o'],
            ],
            [
                ['x', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'o'],
            ],
            [
                ['o', 'x', 'x'],
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
            ],
            [
                ['o', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'x'],
            ]
        ]
    },

    moveLeft() {
        if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
            this.activeTetramino.x -= 1;
        }
    },

    moveRight() {
        if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
            this.activeTetramino.x += 1;
        }
    },

    moveDown() {
        if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
            this.activeTetramino.y += 1;
        } else {
            this.stopMove();
        }
    },

    rotateTetramino() {
        this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex < 3 ?
            this.activeTetramino.rotationIndex + 1 : 0;
        
        this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex]

        if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
            this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex > 0 ?
            this.activeTetramino.rotationIndex - 1 : 3;
        
        this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex]
        }
    },

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
    },
    
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
    },
    
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
    }
}

// отрисовка
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);
canvas.width = sizeBlock * 10;
canvas.height = sizeBlock * 20;

const context = canvas.getContext('2d');

const showArea = area => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < area.length; y++){
        const line = area[y];

        for (let x = 0; x < line.length; x++) {
            const block = line[x];
            if (block !=='o') {
                context.fillStyle = '#57E126';
                context.strokeStyle = 'white';
                context.fillRect(x * sizeBlock, y*sizeBlock, sizeBlock, sizeBlock);
                context.strokeRect(x * sizeBlock, y*sizeBlock, sizeBlock, sizeBlock);
            }            
        }
    }
    
};

window.addEventListener('keydown', event => {
    const key = event.code;
    
    switch (key) {
        case 'ArrowLeft':
            game.moveLeft();
            showArea(game.viewArea);
        break;
        case 'ArrowRight':
            game.moveRight();
            showArea(game.viewArea);
        break;
        case 'ArrowDown':
            game.moveDown();
            showArea(game.viewArea);
        break;
        case 'ArrowUp':
            game.rotateTetramino();
            showArea(game.viewArea);
        break;
    }
});

showArea(game.viewArea);