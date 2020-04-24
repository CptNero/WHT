


//MAIN
let gameArea = document.getElementById("gameArea");
let ctx = gameArea.getContext("2d");
let LEFT_BOUNDARY = 3;
let RIGHT_BOUNDARY = 714;
let UP_BOUNDARY = 3;
let DOWN_BOUNDARY = 836;
let music = new Audio();
let keys = [];
music.src = "./bgmusic.mp3";
music.load();
music.play();

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = false;
});

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function updateFrame()
{
    requestAnimationFrame(updateFrame);
    movePlayer();
    draw();
}

function draw()
{
    drawBackground();
    drawPlayer();
    drawProjectile();
    //animateProjectile("left-right", 2, projectiles);
    //animateProjectile("right-left", 2, projectiles2);
    animateProjectile("lowerRightCorner-upperLeftCorner", 2, projectiles3);
    animateProjectile("upperLeftCorner-lowerRightCorner", 2, projectiles4);
    animateProjectile("lowerLeftCorner-upperRightCorner",2, projectiles5);
    animateProjectile("upperRightCorner-lowerLeftCorner",2, projectiles6);
    collisonCheck();
}

//MAIN

//BACKGROUND
let background_sprite = new Image();
background_sprite.src = "./background.png";

function drawBackground()
{
    ctx.drawImage(background_sprite, 0, 0, background_sprite.width, background_sprite.height);
}
//BACKGROUND

//PLAYER
let player_pos = {x: background_sprite.width / 2, y: background_sprite.height / 1.2};
let player_sprite = new Image();
let player_speed = 10;
let player_friction = 0.7;
let player_velocity = {x: 0, y: 0};
player_sprite.src = "Player/player.png";

player_sprite.onload = function ()
{

    updateFrame();
};

function drawPlayer()
{
    ctx.drawImage(player_sprite, player_pos.x, player_pos.y, 50, 50);
}

function movePlayer() {

    if (keys[38]) {
        if (player_velocity.y > -player_speed) {
            player_velocity.y--;
        }
    }
    if (keys[40]) {
        if (player_velocity.y < player_speed) {
            player_velocity.y++;
        }
    }
    if (keys[39]) {
        if (player_velocity.x < player_speed) {
            player_velocity.x++;
        }
    }
    if (keys[37]) {
        if (player_velocity.x > -player_speed) {
            player_velocity.x--;
        }
    }

    player_velocity.x *= player_friction;
    player_velocity.y *= player_friction;

    if(player_pos.x + player_velocity.x > LEFT_BOUNDARY && player_pos.x + player_velocity.x < RIGHT_BOUNDARY)
    {
        player_pos.x += player_velocity.x;
    }

    if(player_pos.y + player_velocity.y > UP_BOUNDARY && player_pos.y + player_velocity.y < DOWN_BOUNDARY)
    {
        player_pos.y += player_velocity.y;
    }
}
//PLAYER

//Projectile
projectile_spawn_pos_x = 100;
projectile_spawn_pos_y = 100;
projectile_pos = {x: projectile_spawn_pos_x, y: projectile_spawn_pos_y};
projectile_sprite = new Image();
projectile_sprite.src  = "Projectiles/big_red_orb.png";

projectile_sprite.onload = function ()
{
    updateFrame();
};

function drawProjectile(pos_x, pos_y)
{
    ctx.drawImage(projectile_sprite, pos_x, pos_y,  50, 50);
}

function animateProjectile(direction, offset, projectile_array)
{
    for(let i = 0; i < projectile_array.length; i++)
    {
        switch (direction)
        {
            case "left-right":
                animateLeftToRightOrReverse(projectile_array[i], offset,false);
                break;
            case "right-left":
                animateLeftToRightOrReverse(projectile_array[i], offset,true);
                break;
            case "upperLeftCorner-lowerRightCorner":
                animateUpperLeftCornerToLowerRightCornerOrReverse(projectile_array[i], offset, true);
                break;
            case "lowerRightCorner-upperLeftCorner":
                animateUpperLeftCornerToLowerRightCornerOrReverse(projectile_array[i], offset, false);
                break;
            case "lowerLeftCorner-upperRightCorner":
                animateLowerLeftCornerToUpperRightCornerOrReverse(projectile_array[i], offset, false);
                break;
            case "upperRightCorner-lowerLeftCorner":
                animateLowerLeftCornerToUpperRightCornerOrReverse(projectile_array[i], offset, true);
                break;
        }
    }
}

function animateLeftToRightOrReverse(projectile, offset, direction)
{
    if(projectile.x <= RIGHT_BOUNDARY && projectile.direction === direction )
    {
        projectile.x += offset;
        drawProjectile(projectile.x, projectile.y);
        if(projectile.x > RIGHT_BOUNDARY)
        {
            projectile.x = RIGHT_BOUNDARY;
            projectile.direction = !direction;
        }
    }
    if (projectile.x >= LEFT_BOUNDARY && projectile.direction === !direction)
    {
        projectile.x -= offset;
        drawProjectile(projectile.x, projectile.y);
        if(projectile.x < LEFT_BOUNDARY)
        {
            projectile.x = LEFT_BOUNDARY;
            projectile.direction = direction;
        }
    }
}

function animateUpperLeftCornerToLowerRightCornerOrReverse(projectile, offset, direction){
    if(projectile.x <= RIGHT_BOUNDARY && projectile.y <= DOWN_BOUNDARY && projectile.direction === direction )
    {
        projectile.x += offset;
        projectile.y += offset;
        drawProjectile(projectile.x, projectile.y);
        if(projectile.x >= RIGHT_BOUNDARY)
        {
            projectile.x -= RIGHT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if(projectile.x >= DOWN_BOUNDARY)
        {
            projectile.y -= DOWN_BOUNDARY - projectile.y;
            projectile.direction = !direction;
        }
    }
    if (projectile.x >= LEFT_BOUNDARY && projectile.y >= UP_BOUNDARY && projectile.direction === !direction) {
        projectile.x -= offset;
        projectile.y -= offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x <= LEFT_BOUNDARY) {

            projectile.x += LEFT_BOUNDARY - projectile.x;
            projectile.direction = direction;
        }
        if (projectile.y <= UP_BOUNDARY)
        {
            projectile.y += UP_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
}

function animateLowerLeftCornerToUpperRightCornerOrReverse(projectile, offset, direction){

    if(projectile.x <= RIGHT_BOUNDARY && projectile.y <= DOWN_BOUNDARY && projectile.direction === direction )
    {
        projectile.x -= offset;
        projectile.y += offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x <= LEFT_BOUNDARY) {
            projectile.x += LEFT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if(projectile.x >= DOWN_BOUNDARY)
        {
            projectile.y -= DOWN_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
    if (projectile.x >= LEFT_BOUNDARY && projectile.y >= UP_BOUNDARY && projectile.direction === !direction)
    {
        projectile.x += offset;
        projectile.y -= offset;
        drawProjectile(projectile.x, projectile.y);
        if(projectile.x >= RIGHT_BOUNDARY)
        {
            projectile.x -= RIGHT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if (projectile.y <= UP_BOUNDARY)
        {
            projectile.y -= UP_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
}

function boundaryChecks(projectile, direction){
    if(projectile.x <= LEFT_BOUNDARY)
    {
        projectile.x = LEFT_BOUNDARY;
    }
    else if(projectile.x >= RIGHT_BOUNDARY)
    {
        projectile.x = RIGHT_BOUNDARY;
    }
    else if(projectile.y <= UP_BOUNDARY)
    {
        projectile.y = UP_BOUNDARY;
    }
    else if(projectile.y <= DOWN_BOUNDARY)
    {
        projectile.y = DOWN_BOUNDARY;
    }
}
//Projectile

//Lvl1
projectiles = [
    {x: 100, y: 120, src: "",direction: false},
    {x: 120, y: 130, src: "",direction: false},
    {x: 130, y: 140, src: "",direction: false},
    {x: 140, y: 150, src: "",direction: false},
    {x: 150, y: 160, src: "",direction: false},
    {x: 160, y: 170, src: "",direction: false},
    {x: 170, y: 180, src: "",direction: false},
    {x: 180, y: 190, src: "",direction: false},
    {x: 190, y: 200, src: "",direction: false},
    {x: 200, y: 210, src: "",direction: false},
    {x: 210, y: 220, src: "",direction: false},
    {x: 220, y: 230, src: "",direction: false},
    {x: 230, y: 240, src: "",direction: false},
    {x: 240, y: 250, src: "",direction: false},
    {x: 250, y: 260, src: "",direction: false},
    {x: 260, y: 270, src: "",direction: false},
    {x: 270, y: 280, src: "",direction: false},
    {x: 280, y: 290, src: "",direction: false},
    {x: 290, y: 300, src: "",direction: false},
    {x: 300, y: 310, src: "",direction: false},
    {x: 310, y: 320, src: "",direction: false},
    {x: 320, y: 330, src: "",direction: false},
    {x: 330, y: 340, src: "",direction: false},
    {x: 340, y: 350, src: "",direction: false},
];

projectiles2 = [
    {x: 100, y: 120, src: "",direction: false},
    {x: 120, y: 130, src: "",direction: false},
    {x: 130, y: 140, src: "",direction: false},
    {x: 140, y: 150, src: "",direction: false},
    {x: 150, y: 160, src: "",direction: false},
    {x: 160, y: 170, src: "",direction: false},
    {x: 170, y: 180, src: "",direction: false},
    {x: 180, y: 190, src: "",direction: false},
    {x: 190, y: 200, src: "",direction: false},
    {x: 200, y: 210, src: "",direction: false},
    {x: 210, y: 220, src: "",direction: false},
    {x: 220, y: 230, src: "",direction: false},
    {x: 230, y: 240, src: "",direction: false},
    {x: 240, y: 250, src: "",direction: false},
    {x: 250, y: 260, src: "",direction: false},
    {x: 260, y: 270, src: "",direction: false},
    {x: 270, y: 280, src: "",direction: false},
    {x: 280, y: 290, src: "",direction: false},
    {x: 290, y: 300, src: "",direction: false},
    {x: 300, y: 310, src: "",direction: false},
    {x: 310, y: 320, src: "",direction: false},
    {x: 320, y: 330, src: "",direction: false},
    {x: 330, y: 340, src: "",direction: false},
    {x: 340, y: 350, src: "",direction: false},
];

projectiles3 = [
    {x: 400, y: 120, src: "",direction: false},
];

projectiles4 = [
    {x: 200, y: 120, src: "",direction: false},
];

projectiles5 = [
    {x: 200, y: 120, src: "",direction: false},
];

projectiles6 = [
    {x: 300, y: 120, src: "",direction: false},
];
//lvl1

AllProjectiles = [
    projectiles3,
    projectiles4,
    projectiles5,
    projectiles6
];

//Collision
function collisonCheck() {
    for (let i = 0; i < AllProjectiles.length; i++)
    {
        for (let j = 0; j < AllProjectiles[i].length; j++)
        {
            if(distance(player_pos, AllProjectiles[i][j]) < 17)
            {
                alert("you died");
                player_velocity.x = 0;
                player_velocity.y = 0;
                player_pos = player_pos = {x: background_sprite.width / 2, y: background_sprite.height / 1.2};
            }
        }
    }
}

function distance(a,b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy)
}




