
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
    
    this.player = null;
    this.cursors = null;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        //background image
        this.add.tileSprite(0, 0, 2000, 2000, 'background');
        
        //Set World Stuff
        this.world.setBounds(0,0,2000,2000);
        this.physics.startSystem(Phaser.Physics.P2JS);
        
        //create temp graphic for player
        this.player = this.add.graphics(0,100);
        this.player.beginFill(0xffa500);
        this.player.drawRect(0,0, 100, 100);
        this.physics.p2.enable(this.player);
        
        //have the camera follow the player
        this.camera.follow(this.player);
        
        //input
        this.cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        //player movement
        this.player.body.setZeroVelocity();

        if (this.cursors.up.isDown)
        {
            this.player.body.moveUp(300)
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.moveDown(300);
        }

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -300;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.moveRight(300);
        }

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
