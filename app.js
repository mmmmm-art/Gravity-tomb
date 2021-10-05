/// <reference path="../dist/phaser.js" />

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x:0, y: 7600 },
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
var playerx = 500;
var playery = 460;
var stars;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('back', 'assets/background.png');
    this.load.image('floor', 'assets/death1.png');
    this.load.image('star', 'assets/goal.png');
    this.load.spritesheet('dude', 'assets/artifact.png', { frameWidth: 31, frameHeight: 32 });
}

function create ()
{
    this.add.image(400, 300, 'back');

   
    floor = this.physics.add.staticGroup();
    floor.create(400, 600, 'floor');
    floor.create(400, 0, 'floor');
    floor.create(-4787, 300, 'floor').setScale(12).refreshBody();
    floor.create(5558, 300, 'floor').setScale(12).refreshBody();

    
    player = this.physics.add.sprite(playerx, playery, 'dude');

    
    player.setCollideWorldBounds(true);

    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    
    cursors = this.input.keyboard.createCursorKeys();

    
    stars = this.physics.add.staticGroup({
        key: 'star',
        repeat: 0,
        setXY: { x: 400, y: 300,}
    });

    stars.children.iterate(function (child) {

       
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });



    
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    


    
    this.physics.add.overlap(stars, player, collectStar, null, this);

    this.physics.add.collider(player, floor, hitFloor, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-360);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(360);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-360);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(360);
    }
    else
    {
        player.setVelocityY(0);
    }

}

function collectStar (player, star)
{
    star.disableBody(true, true);


    score += 100;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 200, true, true);

        });


    }
}

function hitFloor (player, floor)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}