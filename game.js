const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#0a0f1f',

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let enemies;
let bullets;
let xpGems;

let xp = 0;
let level = 1;
let xpToNextLevel = 5;

let xpText;
let levelText;
let healthText;
let playerHealth = 100;
let playerSpeed = 300;
let bulletSpeed = 500;
let enemySpeed = 180;
let wave = 1;
let waveText;
let gameOver = false;

function preload() {

    this.load.image(
        "bullet",
        "assets/bullets/bullet.png"
    );

    this.load.image(
        "player",
        "assets/player/Man.png"
    );

    this.load.image(
        "zombie",
        "assets/zombie/zombie.png"
    );

    this.load.image(
        "floor",
        "assets/tiles/tiles.png"
    );

}

function create() {

    this.add.tileSprite(
    640,
    360,
    1280,
    720,
    "floor"
);


    player = this.physics.add.sprite(
    640,
    360,
    "player"
);

    waveText = this.add.text(
        20,
        110,
        "Wave: 1",
        {
            fontSize: "24px",
            color: "#ffffff"
        }
    );

player.setScale(0.5);


    cursors = this.input.keyboard.createCursorKeys();

    enemies = this.physics.add.group();
    bullets = this.physics.add.group();
    xpGems = this.physics.add.group();

    levelText = this.add.text(
        20,
        20,
        "Level: 1",
        {
            fontSize: "24px",
            color: "#00ffff"
        }
    );

    xpText = this.add.text(
        20,
        50,
        "XP: 0/5",
        {
            fontSize: "24px",
            color: "#00ffff"
        }
    );

    healthText = this.add.text(
        20,
        80,
        "HP: 100",
        {
            fontSize: "24px",
            color: "#ff4444"
        }
    );


    this.time.addEvent({
        delay: 300,
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 500,
        callback: shootBullet,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(
        bullets,
        enemies,
        bulletHitEnemy,
        null,
        this
    );

    this.physics.add.overlap(
        player,
        xpGems,
        collectXP,
        null,
        this
    );

    this.physics.add.overlap(
        player,
        enemies,
        playerHitEnemy,
        null,
        this
    );

}



function spawnEnemy() {

    let side = Phaser.Math.Between(0, 3);

    let x;
    let y;

    if (side === 0) {
        x = Phaser.Math.Between(0, 1280);
        y = -50;
    }
    else if (side === 1) {
        x = 1330;
        y = Phaser.Math.Between(0, 720);
    }
    else if (side === 2) {
        x = Phaser.Math.Between(0, 1280);
        y = 770;
    }
    else {
        x = -50;
        y = Phaser.Math.Between(0, 720);
    }

    let enemy = this.physics.add.sprite(
        x,
        y,
        "zombie"
    );

    enemy.setScale(0.55);

    enemies.add(enemy);
}

function shootBullet() {

    if (enemies.getChildren().length === 0) {
        return;
    }

    let closestEnemy = null;
    let shortestDistance = Infinity;

    enemies.getChildren().forEach(enemy => {

        let distance = Phaser.Math.Distance.Between(
            player.x,
            player.y,
            enemy.x,
            enemy.y
        );

        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestEnemy = enemy;
        }

    });

    if (!closestEnemy) {
        return;
    }

    let bullet = this.physics.add.sprite(
        player.x,
        player.y,
        "bullet"
    );

    bullet.setScale(0.15);


    bullets.add(bullet);

    this.physics.moveToObject(
        bullet,
        closestEnemy,
        bulletSpeed
    );
}

function bulletHitEnemy(bullet, enemy) {

    let scene = game.scene.scenes[0];

    let gem = scene.add.rectangle(
        enemy.x,
        enemy.y,
        15,
        15,
        0x00ff00
    );

    scene.physics.add.existing(gem);

    xpGems.add(gem);
    gem.body.setVelocity(
        Phaser.Math.Between(-30,30),
        Phaser.Math.Between(-30,30)
    );
    bullet.destroy();
    enemy.destroy();
}

function collectXP(player, gem) {

    gem.destroy();

    xp += 1;

    xpText.setText(
        `XP: ${xp}/${xpToNextLevel}`
    );

    if (xp >= xpToNextLevel) {

        level++;
        wave++;

        waveText.setText(
            `Wave: ${wave}`
        );

        xp = 0;
        xpToNextLevel += 10;

        levelText.setText(
            `Level: ${level}`
        );

        xpText.setText(
            `XP: ${xp}/${xpToNextLevel}`
        );

        enemySpeed += 20;

        console.log("LEVEL UP");
    }
}

    function playerHitEnemy(player, enemy) {

        enemy.destroy();

        playerHealth -= 10;

        healthText.setText(
            `HP: ${playerHealth}`
        );

        if (playerHealth <= 0) {

            game.scene.scenes[0].add.text(
                450,
                300,
                "GAME OVER",
                {
                    fontSize: "72px",
                    color: "#ff0000"
                }
    );

game.scene.scenes[0].physics.pause();
        }
    }



function update() {

    player.body.setVelocity(0);

    if (cursors.left.isDown) {
        player.body.setVelocityX(-playerSpeed);
    }

    if (cursors.right.isDown) {
        player.body.setVelocityX(playerSpeed);
    }

    if (cursors.up.isDown) {
        player.body.setVelocityY(-playerSpeed);
    }

    if (cursors.down.isDown) {
        player.body.setVelocityY(playerSpeed);
    }

    bullets.getChildren().forEach(bullet => {

    if (
        bullet.x < -50 ||
        bullet.x > 1330 ||
        bullet.y < -50 ||
        bullet.y > 770
    ) {
        bullet.destroy();
    }

});

    xpGems.getChildren().forEach(gem => {

    let distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        gem.x,
        gem.y
    );

    if(distance < 150){

        this.physics.moveToObject(
            gem,
            player,
            250
        );

    }

});


    enemies.getChildren().forEach(enemy => {

        if (enemy.active) {

            this.physics.moveToObject(
                enemy,
                player,
                enemySpeed + (level * 10)
            );

        }

    });
}