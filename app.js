const box = document.querySelector('.box');
const h1Maker = document.querySelector('h1');
const gameBoard = document.querySelector('.game');
const dim = gameBoard.getBoundingClientRect();
const btn = document.createElement('button');
btn.textContent = 'START';
document.body.append(btn);

const game = {
    size: 30, 
    x:dim.left, 
    y:dim.top, 
    speed:10,
    counter: 0,
    max: 10,
    score: 0,
    status: false
};
const enemies = [];
let keys = {
    ArrowRight: false, 
    ArrowLeft: false, 
    ArrowUp: false, 
    ArrowDown: false,
};

box.style.position = 'absolute';
box.style.border = '1px solid black';
box.style.width = game.size + 'px';
box.style.height = game.size + 'px';
box.style.left = game.x + 'px';
box.style.top = game.y + 'px';
box.style.backgroundColor = 'red';
let move = {};
btn.addEventListener('click', (e) => {
    if (btn.textContent == 'START') {
        btn.textContent = 'STOP';
        move = window.requestAnimationFrame(updatePos);
        game.status = true;
    } else {
        btn.textContent = 'START';
        game.status = false;
    }
})


updateScore();

document.addEventListener('keydown', (e) => {
    if(e.code in keys) {
        keys[e.code] = true;
    }
});
document.addEventListener('keyup', (e) => {
    if(e.code in keys) {
        keys[e.code] = false;
    }
});

h1Maker.addEventListener('click', (e) => {
    const el = maker('div');
    //console.log(el);
});

function updateScore() {
    h1Maker.innerHTML = `Score: ${game.score}`;
}

function isColision(aEl, bEl){
    let a = aEl.getBoundingClientRect();
    let b = bEl.getBoundingClientRect();
    // console.log(a);
    // console.log(b);
    let xAxis = !((a.right < b.left) || (a.left > b.right));
    let yAxis = !((a.bottom < b.top) || (a.top > b.bottom));
    let overTop = xAxis && yAxis
    //console.log(overTop);
    return overTop;
}

function maker(eleType){
    game.counter++;

    const ele = document.createElement('div');
    ele.textContent = game.counter;
    ele.classList.add('enemy');
    ele.style.left = ranNum(dim.left, dim.right - game.size) + 'px';
    ele.style.top = ranNum(dim.top, dim.bottom - game.size) + 'px';
    ele.style.backgroundColor = 'rgb(' + ranNum(0,255) + ',' + ranNum(0,255) + ',' + ranNum(0,255) +')';
    enemies.push(ele);

    ele.dirX = ranNum(1, 8);
    ele.addEventListener('click', (e) => {
        console.log(isColision(ele, box));
    })

    return gameBoard.appendChild(ele);
}

function ranNum(min, max){
    return Math.floor(Math.random() * (max-min+1)+min);
}


function updatePos(){
    if (keys.ArrowLeft && game.x > dim.left) {
        game.x -= game.speed;
    } else if(keys.ArrowRight && game.x < (dim.right - game.size - game.speed)) {
        game.x += game.speed;
    }
    if (keys.ArrowUp && game.y > dim.top) {
        game.y -= game.speed;
    } else if(keys.ArrowDown && game.y < (dim.bottom - game.size - game.speed )) {
        game.y += game.speed;
    }

    box.style.left = game.x + 'px';
    box.style.top = game.y + 'px'; 
    if (ranNum(0,40) == 10 && game.max > enemies.length) {
        const newEle = maker('div');
    }
    // Move enemies
    enemies.forEach((enemy, index) => {
        let x = enemy.offsetLeft;
        let y = enemy.offsetTop ;

        if(x > (dim.right - 30) || x < 0) {
            enemy.dirX *= -1;
        }
        x += enemy.dirX;
        if (isColision(enemy, box)) {
            console.log('hit');
            enemy.remove();
            game.score++;
            updateScore();
            enemies.splice(index, 1);
        };

        enemy.style.left = x + 'px';
    })

    if (game.status) {
        move = window.requestAnimationFrame(updatePos);
    }
}





// for (let i=0; i<50; i++) {
//     game.x += 10;
//     box.style.left = game.x + 'px';
// }

// document.addEventListener('keydown', (e) => {
//     if(e.code == 'ArrowLeft'){
//         game.x -= game.speed;
//         updatePos();
//     }
//     if(e.code == 'ArrowRight'){
//         game.x += game.speed;
//         updatePos();
//     }
//     if(e.code == 'ArrowUp'){
//         game.y -= game.speed;
//         updatePos();
//     }if(e.code == 'ArrowDown'){
//         game.y += game.speed;
//         updatePos();
//     }
// })

