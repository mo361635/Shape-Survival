
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    //Input
    this.cursors = null;
    
    //Character
    this.player = null;
    
    //Groups
    this.zombies = null;
    this.bullets = null;
    
    //fire variables
    this.fireRate = 1000;
    this.nextFire = 0;
};

BasicGame.Game.prototype = {

    create: function () {

        //Set Game Stuff
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.tileSprite(0, 0, 2000, 2000, 'background');
        this.world.setBounds(0,0,2000, 2000);
        
        //Create Player
        this.player = this.add.graphics(0,0);
        this.player.beginFill(0xffa500);
        this.player.drawRect(0,0, 75, 75);
        
        this.physics.arcade.enable(this.player)
        this.player.body.collideWorldBounds = true;
        
        //have the camera follow the player
        this.camera.follow(this.player);
        
        //Set Input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Set Groups
        this.zombies = this.add.group();
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        
        //Set Group Physics And Collisions
        this.zombies.enableBody = true;
        
        //Create Zombies in the group zombies
        this.zombies.create(100, 1000, 'zombie', 3);
        this.zombies.create (600, 600, 'zombie', 3);
        this.zombies.create(200, 700, 'zombie', 3);
        this.zombies.create (250, 1100, 'zombie', 3);
        this.zombies.create(500, 1500, 'zombie', 3);
        this.zombies.create (750, 300, 'zombie', 3);
        this.zombies.create(900,1000, 'zombie', 3);
        this.zombies.create (1100,1300, 'zombie', 3);
        this.zombies.create(1600,1700, 'zombie', 3);
        this.zombies.create (1900,1900, 'zombie', 3);
        
        //Loop through all added zombies and add what is neccecary
        for(var i = 0; i < this.zombies.length; i++){
            var thisZombie = this.zombies.getChildAt(i);
            thisZombie.animations.add('left', [0,1]);
            thisZombie.animations.add('right', [4,5]);
            thisZombie.body.setSize(100,100,25,25);
        }
        
    //  Text
    stateText = this.game.add.text(100, 100,"You Died", { font: '60px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    },

    update: function () {
        
        //Reset Player Velocity
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        //Get Input Arrow Keys,Then Move Player
        if (this.cursors.up.isDown)
        {
            this.player.body.velocity.y = -250;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.velocity.y = 250;
        }

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -250;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 250;
        }
        
        //fire the bullet
        if (this.input.activePointer.isDown)
        {
            this.fire();
        }
        
        //make all zombies move towards the player.
        if(this.zombies.length != 0 && this.player.alive)
        {
            for(var i = 0; i < this.zombies.length; i++){
                var thisZombie = this.zombies.getChildAt(i);
                this.physics.arcade.moveToObject(thisZombie, this.player, 100);
                if(thisZombie.x > this.player.x)
                    thisZombie.animations.play('left', 4, true);
                else
                    thisZombie.animations.play('right', 5, true);
            }
        }
        
        //are all zombies dead?
        if(this.zombies)

        
        //is player dead?
        if(this.player.alive == false)
            {                
            stateText.x = (this.player.x); 
            stateText.y = (this.player.y);
            stateText.visible = true;
            }

        //Collision Detections
        this.physics.arcade.overlap(this.bullets, this.zombies, this.bulletandzombie, null, this);
        this.physics.arcade.overlap(this.player, this.zombies, this.playerandzombie, null, this);
        
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    
    render: function() {
  
    },
    
    fire: function() {
        if (this.time.now > this.nextFire && this.player.alive)
        {
            this.nextFire = this.time.now + this.fireRate;

            //Create Bullet
            var bullet = this.add.graphics(this.player.position.x + 37.5,this.player.position.y + 37.5);
            bullet.beginFill(0x7f5200);
            bullet.drawCircle(0,0, 25, 25);
            this.world.bringToTop(bullet);
            this.bullets.add(bullet);
            
            this.physics.arcade.moveToPointer(bullet, 300);
            
        }
    },
    
    bulletandzombie: function(bullet, zombie) {
        bullet.kill();
        zombie.kill();
    },
    
    playerandzombie: function(player,zombie) {
        player.kill();
    }
};
