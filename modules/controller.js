export class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;        

        

                
    }
    
    init (codeKey) {
        window.addEventListener('keydown', event => {
            if(event.code === codeKey){
                this.view.init();
                this.start();
                document.getElementsByClassName('preview')[0].style.display = "none";
            }
        })

    }

    start () {
        this.view.showArea(this.game.viewArea);

        setInterval(() => {
            this.game.moveDown();
            this.view.showArea(this.game.viewArea);
        }, 1000)

        window.addEventListener('keydown', event => {
            const key = event.code;
            
            switch (key) {
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowUp':
                    this.game.rotateTetramino();
                    this.view.showArea(this.game.viewArea);
                break;
            }
        });

    }
}