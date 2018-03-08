
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
    
    //Zombie Animations
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    
    //Characters
    this.zombie = null;
    this.player = null;
    
    //Groups
    this.zombies = null;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        //Set Zombies Group
        //this.zombies = this.add.group();
        //this.zombies.enableBody = true;
        
        //Set Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Set Background Image
        this.add.tileSprite(0, 0, 2000, 2000, 'background');
        
        //Set World 
        this.world.setBounds(0,0,2000, 2000);
        
        //Create Player
        this.player = this.add.graphics(0,0);
        this.player.beginFill(0xffa500);
        this.player.drawRect(0,0, 75, 75);
        
        //Set Player Physics
        this.physics.arcade.enable(this.player)
        this.player.body.collideWorldBounds = true;
        
        //have the camera follow the player
        this.camera.follow(this.player);
        
        //Set Input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Create Zombie
        this.zombie = this.add.sprite(100, 100, 'zombie', 3);
        
        //Set Zombie Physics
        this.physics.arcade.enable(this.zombie)
        //this.left = this.zombie.animations.add('left', [2, 1, 2, 0], 4, true);
        //this.right = this.zombie.animations.add('right', [3, 4, 3, 5], 4, true);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
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
        
        this.physics.arcade.moveToObject(this.zombie, this.player, 100);
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    
    render: function() {
        //this.debug.cameraInfo(this.camera, 32, 32);
        //Phaser.Utils.debug.camera(this.camera);
        //this.debug.cameraInfo(this.camera, 32, 32);
    }
};
