/// <reference path="../dist/phaser.js" />

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x:0, y:0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars
var bombs
var pain
var hit
var enemy
var why
var hitPain
var hitEnemy
var gg
var beam
var beam1
var beam2
var beam3
var beam4
var platforms
var cursors
var score = 0;
var hitCount = 0;
var gameOver = false;
var scoreText;
var gameOverText
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('back', 'assets/back2.png');
    this.load.image('floor1', 'assets/death1.png');
    this.load.image('floor2', 'assets/death2.png')
    this.load.image('pain', 'assets/pain.png');
    this.load.image('enemy', 'assets/enemy.png')
    this.load.image('star', 'assets/goal.png');
    this.load.image('bomb', 'assets/gg.png');
    this.load.image('beam', 'assets/beam.png');
    this.load.image('beam2', 'assets/beam2.png');
    this.load.spritesheet('dude', 'assets/mm.png', { frameWidth: 56, frameHeight: 54 });
}

function create ()
{
    this.add.image(600, 300, 'back');

   
    floor1 = this.physics.add.staticGroup();
    floor2 = this.physics.add.staticGroup();
    floor1.create(600, 20, 'floor1');
    floor1.create(600, 580, 'floor1');
    floor2.create(20, 300, 'floor2');
    floor2.create(1180, 300, 'floor2');

    enemy = this.physics.add.sprite(70, 300, 'enemy');
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
    player = this.physics.add.sprite(500, 100, 'dude');
    player.setCollideWorldBounds(true);
    player.setBounce(1)

   this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'dead',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate:30,
        repeat: -1
    });

    
    cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
        q:  Phaser.Input.Keyboard.KeyCodes.Q,
        d:  Phaser.Input.Keyboard.KeyCodes.D,
        a:  Phaser.Input.Keyboard.KeyCodes.A,
        s:  Phaser.Input.Keyboard.KeyCodes.S,
        w:  Phaser.Input.Keyboard.KeyCodes.W,
    });
    
    stars = this.physics.add.staticGroup({
        key: 'star',
        repeat: 0,
        setXY: { x: 400, y: 300,}
    });
    bombs = this.physics.add.group();
    beam = this.physics.add.group();
    pain = this.physics.add.staticGroup();
    scoreText = this.add.text(600, 50, 'score: 0', { fontSize: '32px', fill: '#7d378f' });
    gameOverText = this.add.text(300, 200, 'Game Over', { fontSize: '100px', fill: '#ffffff' });
    this.physics.add.collider(bombs, floor1);
    this.physics.add.collider(bombs, floor2);
    this.physics.add.collider(enemy, floor1);
    this.physics.add.collider(enemy, floor2);
    this.physics.add.collider(enemy, bombs);
    this.physics.add.collider(enemy, beam, hitBeam,null, this);
    hitPain = this.physics.add.collider(player,pain);
    this.physics.add.collider(bombs,pain);
    why = this.physics.add.overlap(stars, player, collectStar, null, this);
    this.physics.add.collider(player, floor1, hitBomb, null, this);
    this.physics.add.collider(player, floor2, hitBomb, null, this);
    hit = this.physics.add.collider(player, bombs, hitBomb, null, this);
    hitEnemy = this.physics.add.collider(player, enemy, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }
    gameOverText.alpha = 0;
    if (this.keys.q.isDown)
    {
        player.alpha = 0;
        hit.active = false;
        hitPain.active = false;
        why.active = false;
        hitEnemy.active = false;
    }
    else 
    {
        player.alpha = 1;
        hit.active = true;
        hitPain.active = true;
        why.active = true;
        hitEnemy.active = true; 
    }
    if (this.keys.a.isDown)
    {
        beam1 = beam.create(player.x, player.y, 'beam');
        beam1.setVelocityX(-260);
    }
    if (this.keys.d.isDown)
    {
        beam2 = beam.create(player.x, player.y, 'beam');
        beam2.setVelocityX(260);
    }
    if (this.keys.w.isDown)
    {
        beam3 = beam.create(player.x, player.y, 'beam2');
        beam3.setVelocityY(-260);
    }
    if (this.keys.s.isDown)
    {
        beam4 = beam.create(player.x, player.y, 'beam2');
        beam4.setVelocityY(260);
    }
    if (cursors.left.isDown)
    {
        player.setVelocityX(-360);
        
        player.anims.play('right', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(360);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims. play('right', true)
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-360);

        player.anims. play('right', true)
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(360);

        player.anims. play('right', true)
    }
    else
    {
        player.setVelocityY(0);

        player.anims. play('right', true)
    }
    if (enemy.x > player.x)
    {
        enemy.setVelocityX(-200)
    }
    else if (enemy.x < player.x)
    {
        enemy.setVelocityX(200)
    }
    else
    {
        enemy.setVelocityX(0);
    }
    if (enemy.y > player.y)
    {
        enemy.setVelocityY(-200)
    }
    else if (enemy.y < player.y)
    {
        enemy.setVelocityY(200)
    }
    else
    {
        enemy.setVelocityY(0);
    }
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 1000;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, Math.random() * 1100 + 50, Math.random() * 500 + 50, true, true);

        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 0);

        var bomb = bombs.create(x, Math.random() * 400, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Math.random() * 400 + 50);
        

        pain.create(Math.random() * 1100 + 50, Math.random() * 500 + 50, 'pain')
    }
}
function hitBomb ()
{
    player.anims.play('dead');
    gameOver = true;
    gameOverText.alpha = 1;
    why.active = false;
}
function hitBeam ()
{
    enemy.x = 70;
    enemy.y = 300;
}
