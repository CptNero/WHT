//MAIN
let gameArea = document.getElementById("gameArea");
let ctx = gameArea.getContext("2d");
let LEFT_BOUNDARY = 3;
let RIGHT_BOUNDARY = 714;
let UP_BOUNDARY = 3;
let DOWN_BOUNDARY = 836;
let current_level = 1;
let death_counter = 0;
let game_complete = false;
let keys = [];
let musicStage1To5 = new Audio();
let musicStage5to10 = new Audio();
let victory_music = new Audio();
let death_sound = new Audio();
let portal_sound = new Audio();
let bg_music_playing = false;
musicStage1To5.src = "./Sound/bg_music2.mp3";
musicStage5to10.src = "./Sound/bg_music.mp3";
victory_music.src = "./Sound/victory_music.mp3";
death_sound.src = "./Sound/death_sound.wav";
portal_sound.src = "./Sound/portal_sound.wav";
musicStage1To5.load();
musicStage5to10.load();
victory_music.load();
death_sound.load();
portal_sound.load();

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

function updateFrame() {

    requestAnimationFrame(updateFrame);
    movePlayer();
    draw();
}

function draw() {
    drawBackground();
    drawPlayer();
    drawPortal();
    switch (current_level) {
        case 1:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            animateProjectile("left-right", 4, projectiles_on_left);
            animateProjectile("right-left", 4, projectiles_on_right);
            break;
        case 2:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            animateProjectile("up-down", 4, projectiles_on_left);
            animateProjectile("down-up", 4, projectiles_on_right);
            break;
        case 3:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            animateProjectile("left-right", 3, projectiles_on_left);
            animateProjectile("right-left", 3, projectiles_on_right);
            animateProjectile("up-down", 3, projectiles_on_left2);
            animateProjectile("down-up", 3, projectiles_on_right2);
            break;
        case 4:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            animateProjectile("upperLeftCorner-lowerRightCorner", 4, projectiles_on_left);
            animateProjectile("lowerRightCorner-upperLeftCorner", 4, projectiles_on_right);
            break;
        case 5:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            animateProjectile("upperLeftCorner-lowerRightCorner", 2, projectiles_on_left);
            animateProjectile("lowerRightCorner-upperLeftCorner", 2, projectiles_on_right);
            animateProjectile("lowerLeftCorner-upperRightCorner", 2, projectiles_on_left2);
            animateProjectile("upperRightCorner-lowerLeftCorner", 2, projectiles_on_right2);
            break;
        case 6:
            AllProjectiles.push(projectiles_in_cornerA);
            AllProjectiles.push(projectiles_in_cornerB);
            AllProjectiles.push(projectiles_in_cornerC);
            AllProjectiles.push(projectiles_in_cornerD);
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            animateProjectile("upperLeftCorner-lowerRightCorner", 3, projectiles_in_cornerA);
            animateProjectile("upperRightCorner-lowerLeftCorner", 3, projectiles_in_cornerB);
            animateProjectile("lowerLeftCorner-upperRightCorner", 3, projectiles_in_cornerC);
            animateProjectile("lowerRightCorner-upperLeftCorner", 3, projectiles_in_cornerD);
            animateProjectile("upperLeftCorner-lowerRightCorner", 2, projectiles_on_left);
            animateProjectile("lowerRightCorner-upperLeftCorner", 2, projectiles_on_right);
            animateProjectile("lowerLeftCorner-upperRightCorner", 2, projectiles_on_left2);
            animateProjectile("upperRightCorner-lowerLeftCorner", 2, projectiles_on_right2);
            break;
        case 7:
            AllProjectiles.push(projectiles_in_cornerA);
            AllProjectiles.push(projectiles_in_cornerB);
            AllProjectiles.push(projectiles_in_cornerC);
            AllProjectiles.push(projectiles_in_cornerD);
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            animateProjectile("upperLeftCorner-lowerRightCorner", 3, projectiles_in_cornerA);
            animateProjectile("upperRightCorner-lowerLeftCorner", 3, projectiles_in_cornerB);
            animateProjectile("lowerLeftCorner-upperRightCorner", 3, projectiles_in_cornerC);
            animateProjectile("lowerRightCorner-upperLeftCorner", 3, projectiles_in_cornerD);
            animateProjectile("up-down", 3, projectiles_on_left);
            animateProjectile("down-up", 3, projectiles_on_right);
            break;
        case 8:
            AllProjectiles.push(projectiles_in_cornerA);
            AllProjectiles.push(projectiles_in_cornerB);
            AllProjectiles.push(projectiles_in_cornerC);
            AllProjectiles.push(projectiles_in_cornerD);
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            animateProjectile("upperLeftCorner-lowerRightCorner", 3, projectiles_in_cornerA);
            animateProjectile("upperRightCorner-lowerLeftCorner", 3, projectiles_in_cornerB);
            animateProjectile("lowerLeftCorner-upperRightCorner", 3, projectiles_in_cornerC);
            animateProjectile("lowerRightCorner-upperLeftCorner", 3, projectiles_in_cornerD);
            animateProjectile("up-down", 3, projectiles_on_left);
            animateProjectile("down-up", 3, projectiles_on_right);
            animateProjectile("left-right", 3, projectiles_on_left2);
            animateProjectile("right-left", 3, projectiles_on_right2);
            break;
        case 9:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            AllProjectiles.push(projectiles_on_left3);
            AllProjectiles.push(projectiles_on_right3);
            animateProjectile("upperLeftCorner-lowerRightCorner", 3, projectiles_on_left);
            animateProjectile("lowerRightCorner-upperLeftCorner", 3, projectiles_on_right);
            animateProjectile("lowerLeftCorner-upperRightCorner", 3, projectiles_on_left2);
            animateProjectile("upperRightCorner-lowerLeftCorner", 3, projectiles_on_right2);
            animateProjectile("up-down", 3, projectiles_on_left3);
            animateProjectile("down-up", 3, projectiles_on_right3);
            break;
        case 10:
            AllProjectiles.push(projectiles_on_left);
            AllProjectiles.push(projectiles_on_right);
            AllProjectiles.push(projectiles_on_left2);
            AllProjectiles.push(projectiles_on_right2);
            AllProjectiles.push(projectiles_on_left3);
            AllProjectiles.push(projectiles_on_right3);
            AllProjectiles.push(projectiles_on_left4);
            AllProjectiles.push(projectiles_on_right4);
            AllProjectiles.push(projectiles_in_cornerA);
            AllProjectiles.push(projectiles_in_cornerB);
            AllProjectiles.push(projectiles_in_cornerC);
            AllProjectiles.push(projectiles_in_cornerD);
            animateProjectile("upperLeftCorner-lowerRightCorner", 3, projectiles_on_left);
            animateProjectile("lowerRightCorner-upperLeftCorner", 3, projectiles_on_right);
            animateProjectile("lowerLeftCorner-upperRightCorner", 3, projectiles_on_left2);
            animateProjectile("upperRightCorner-lowerLeftCorner", 3, projectiles_on_right2);
            animateProjectile("up-down", 3, projectiles_on_left3);
            animateProjectile("down-up", 3, projectiles_on_right3);
            animateProjectile("left-right", 3, projectiles_on_left4);
            animateProjectile("right-left", 3, projectiles_on_right4);
            animateProjectile("up-down", 3, projectiles_in_cornerA);
            animateProjectile("down-up", 3, projectiles_in_cornerB);
            animateProjectile("left-right", 3, projectiles_in_cornerC);
            animateProjectile("right-left", 3, projectiles_in_cornerD);
            break;
        case 11:
            drawVictoryText();
            break;
    }
    collisonCheck();
}

//MAIN

//BACKGROUND
let background_sprite = new Image();
background_sprite.src = "./Assets/background.png";

function drawBackground() {
    ctx.drawImage(background_sprite, 0, 0, background_sprite.width, background_sprite.height);
}
//BACKGROUND

//Scorebaard
let scoreboard = document.getElementById("scoreboard");

function updateScoreboard(){
    scoreboard.innerText =
        `Deaths: ${death_counter} Current level: ${current_level}`;
}

//Scoreboard

//PLAYER
let player_pos = {x: background_sprite.width / 2, y: background_sprite.height / 1.2};
let player_sprite = new Image();
let player_speed = 2;
let player_friction = 0.7;
let player_velocity = {x: 0, y: 0};
player_sprite.src = "Player/player.png";

player_sprite.onload = function () {

    updateFrame();
};

function drawPlayer() {
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
        if(!bg_music_playing){
            musicStage1To5.play();
            bg_music_playing = true;
        }
    }

    player_velocity.x *= player_friction;
    player_velocity.y *= player_friction;

    if (player_pos.x + player_velocity.x > LEFT_BOUNDARY && player_pos.x + player_velocity.x < RIGHT_BOUNDARY) {
        player_pos.x += player_velocity.x;
    }

    if (player_pos.y + player_velocity.y > UP_BOUNDARY && player_pos.y + player_velocity.y < DOWN_BOUNDARY) {
        player_pos.y += player_velocity.y;
    }
}

//PLAYER

//Projectile
projectile_spawn_pos_x = 100;
projectile_spawn_pos_y = 100;
projectile_pos = {x: projectile_spawn_pos_x, y: projectile_spawn_pos_y};
projectile_sprite = new Image();
projectile_sprite.src = "Projectiles/big_red_orb.png";

projectile_sprite.onload = function () {
    updateFrame();
};

function drawProjectile(pos_x, pos_y) {
    ctx.drawImage(projectile_sprite, pos_x, pos_y, 50, 50);
}

function animateProjectile(direction, offset, projectile_array) {
    for (let i = 0; i < projectile_array.length; i++) {
        switch (direction) {
            case "left-right":
                animateLeftToRightOrReverse(projectile_array[i], offset, false);
                break;
            case "right-left":
                animateLeftToRightOrReverse(projectile_array[i], offset, true);
                break;
            case "up-down":
                animateUpToDownOrReverse(projectile_array[i], offset, false);
                break;
            case "down-up":
                animateUpToDownOrReverse(projectile_array[i], offset, true);
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

function animateLeftToRightOrReverse(projectile, offset, direction) {
    if (projectile.x <= RIGHT_BOUNDARY && projectile.direction === direction) {
        projectile.x += offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x > RIGHT_BOUNDARY) {
            projectile.x = RIGHT_BOUNDARY;
            projectile.direction = !direction;
        }
    }
    if (projectile.x >= LEFT_BOUNDARY && projectile.direction === !direction) {
        projectile.x -= offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x < LEFT_BOUNDARY) {
            projectile.x = LEFT_BOUNDARY;
            projectile.direction = direction;
        }
    }
}

function animateUpToDownOrReverse(projectile, offset, direction) {
    if (projectile.y <= DOWN_BOUNDARY && projectile.direction === direction) {
        projectile.y += offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.y > DOWN_BOUNDARY) {
            projectile.y = DOWN_BOUNDARY;
            projectile.direction = !direction;
        }
    }
    if (projectile.y >= UP_BOUNDARY && projectile.direction === !direction) {
        projectile.y -= offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.y < UP_BOUNDARY) {
            projectile.y = UP_BOUNDARY;
            projectile.direction = direction;
        }
    }
}

function animateUpperLeftCornerToLowerRightCornerOrReverse(projectile, offset, direction) {
    if (projectile.x <= RIGHT_BOUNDARY && projectile.y <= DOWN_BOUNDARY && projectile.direction === direction) {
        projectile.x += offset;
        projectile.y += offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x >= RIGHT_BOUNDARY) {
            projectile.x -= RIGHT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if (projectile.y >= DOWN_BOUNDARY) {
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
        if (projectile.y <= UP_BOUNDARY) {
            projectile.y += UP_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
}

function animateLowerLeftCornerToUpperRightCornerOrReverse(projectile, offset, direction) {

    if (projectile.x <= RIGHT_BOUNDARY && projectile.y <= DOWN_BOUNDARY && projectile.direction === direction) {
        projectile.x -= offset;
        projectile.y += offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x <= LEFT_BOUNDARY) {
            projectile.x += LEFT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if (projectile.y >= DOWN_BOUNDARY) {
            projectile.y -= DOWN_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
    if (projectile.x >= LEFT_BOUNDARY && projectile.y >= UP_BOUNDARY && projectile.direction === !direction) {
        projectile.x += offset;
        projectile.y -= offset;
        drawProjectile(projectile.x, projectile.y);
        if (projectile.x >= RIGHT_BOUNDARY) {
            projectile.x -= RIGHT_BOUNDARY - projectile.x;
            projectile.direction = !direction;
        }
        if (projectile.y <= UP_BOUNDARY) {
            projectile.y -= UP_BOUNDARY - projectile.y;
            projectile.direction = direction;
        }
    }
}

function boundaryChecks(projectile, direction) {
    if (projectile.x <= LEFT_BOUNDARY) {
        projectile.x = LEFT_BOUNDARY;
    } else if (projectile.x >= RIGHT_BOUNDARY) {
        projectile.x = RIGHT_BOUNDARY;
    } else if (projectile.y <= UP_BOUNDARY) {
        projectile.y = UP_BOUNDARY;
    } else if (projectile.y <= DOWN_BOUNDARY) {
        projectile.y = DOWN_BOUNDARY;
    }
}

//Projectile

//Goal Portal
let portal_pos = {x: RIGHT_BOUNDARY / 2, y: 10};
let portal_sprite = new Image();
portal_sprite.src = "Assets/goal_portal.png";

function drawPortal() {
    ctx.drawImage(portal_sprite, portal_pos.x, portal_pos.y, 100, 100);
}

//Goal Portal

//Victory text
let victory_text_pos = {x: RIGHT_BOUNDARY/2, y: DOWN_BOUNDARY / 2};
let victory_text_sprite = new Image();
victory_text_sprite.src = "Assets/victory_screen.png";

function drawVictoryText() {
    ctx.drawImage(victory_text_sprite, victory_text_pos.x, victory_text_pos.y, 200, 200);
}


//Victory text


//Collision
function collisonCheck() {
    for (let i = 0; i < AllProjectiles.length; i++) {
        for (let j = 0; j < AllProjectiles[i].length; j++) {
            if (distance(player_pos, AllProjectiles[i][j]) < 17) {
                death_counter++;
                player_pos = player_pos = {x: background_sprite.width / 2, y: background_sprite.height / 1.2};
                death_sound.play();
                updateScoreboard();
            }
        }
    }
    if (distance(player_pos, portal_pos) < 50 && !game_complete) {
        player_pos = player_pos = {x: background_sprite.width / 2, y: background_sprite.height / 1.2};
        portal_sound.play();

        current_level++;
        AllProjectiles = [];

        if(game_complete){
            current_level = 1;
        }

        updateScoreboard();

        switch (current_level) {
            case 5:
                musicStage1To5.pause();
                musicStage5to10.play();
                break;
            case 11:
                musicStage5to10.pause();
                game_complete = true;
                victory_music.play();
                break;

        }
    }
}

function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy)
}

//Projectile sets
projectiles_on_left = [
    {x: 10, y: 600, direction: false},
    {x: 10, y: 400, direction: false},
    {x: 10, y: 200, direction: false},
    {x: 110, y: 600, direction: false},
    {x: 210, y: 400, direction: false},
    {x: 310, y: 200, direction: false},
];

projectiles_on_left2 = [
    {x: 10, y: 600, direction: false},
    {x: 10, y: 400, direction: false},
    {x: 10, y: 200, direction: false},
    {x: 110, y: 600, direction: false},
    {x: 210, y: 400, direction: false},
    {x: 310, y: 200, direction: false},
];

projectiles_on_left3 = [
    {x: 10, y: 600, direction: false},
    {x: 10, y: 400, direction: false},
    {x: 10, y: 200, direction: false},
    {x: 110, y: 600, direction: false},
    {x: 210, y: 400, direction: false},
    {x: 310, y: 200, direction: false},
];

projectiles_on_left4 = [
    {x: 10, y: 600, direction: false},
    {x: 10, y: 400, direction: false},
    {x: 10, y: 200, direction: false},
    {x: 110, y: 600, direction: false},
    {x: 210, y: 400, direction: false},
    {x: 310, y: 200, direction: false},
];


projectiles_on_right = [
    {x: 750, y: 700, direction: false},
    {x: 750, y: 500, direction: false},
    {x: 750, y: 300, direction: false},
    {x: 750, y: 100, direction: false},
    {x: 650, y: 700, direction: false},
    {x: 450, y: 500, direction: false},
    {x: 350, y: 300, direction: false},
    {x: 250, y: 100, direction: false},
];

projectiles_on_right2 = [
    {x: 750, y: 700, direction: false},
    {x: 750, y: 500, direction: false},
    {x: 750, y: 300, direction: false},
    {x: 750, y: 100, direction: false},
    {x: 650, y: 700, direction: false},
    {x: 450, y: 500, direction: false},
    {x: 350, y: 300, direction: false},
    {x: 250, y: 100, direction: false},
];


projectiles_on_right3 = [
    {x: 750, y: 700, direction: false},
    {x: 750, y: 500, direction: false},
    {x: 750, y: 300, direction: false},
    {x: 750, y: 100, direction: false},
    {x: 650, y: 700, direction: false},
    {x: 450, y: 500, direction: false},
    {x: 350, y: 300, direction: false},
    {x: 250, y: 100, direction: false},
];

projectiles_on_right4 = [
    {x: 750, y: 700, direction: false},
    {x: 750, y: 500, direction: false},
    {x: 750, y: 300, direction: false},
    {x: 750, y: 100, direction: false},
    {x: 650, y: 700, direction: false},
    {x: 450, y: 500, direction: false},
    {x: 350, y: 300, direction: false},
    {x: 250, y: 100, direction: false},
];

projectiles_in_cornerA = [
    {x: 30, y: 30, direction: false},
];

projectiles_in_cornerB = [
    {x: 700, y: 30, direction: false},
];

projectiles_in_cornerC = [
    {x: 40, y: 820, direction: false},
];

projectiles_in_cornerD = [
    {x: 700, y: 820, direction: false},
];


//Projectile sets

AllProjectiles = [];


