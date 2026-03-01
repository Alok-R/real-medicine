import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  /**
   * Load any assets you might need here!
   */
  preload() {
    this.load.spritesheet("player", "assets/player2.png", {
      frameWidth: 20,
      frameHeight: 20,
    });

    // TODO 1: load the tileset and tilemap with keys of "tileset" and "map" respectively.
    this.load.image("tileset", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/my_map6.json");
    


    this.load.image("coin", "assets/coin.png");
    this.load.image("enemy", "assets/enemy.png");


    this.load.image("patient1", "assets/enemy.png");
    this.load.image("patient2", "assets/enemy.png");
    this.load.image("patient3", "assets/enemy.png");
    this.load.image("patient4", "assets/enemy.png");


    this.load.audio("jump", ["assets/jump.ogg", "assets/jump.mp3"]);
    this.load.audio("coin", ["assets/coin.ogg", "assets/coin.mp3"]);
    this.load.audio("dead", ["assets/dead.ogg", "assets/dead.mp3"]);
    
  }

  /**
   * Called once. Create any objects you need here!
   */
  create() {
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    // create the player sprite
    this.player = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2, "player");
    this.patient1 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+50, "patient1");
    this.patient2 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-50, "patient2");
    this.patient3 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-150, "patient3");
    this.patient4 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+150, "patient4");
    // player movement animations
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {frames: [1, 2]}),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {frames: [3, 4]}),
      frameRate: 8,
      repeat: -1,
    });

    // add gravity to make the player fall
    this.player.body.gravity.y = 500;

    // create arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    this.createWalls();

    // Make the player collide with walls
    this.physics.add.collider(this.player, this.walls);


    // Display the score
    this.scoreLabel = this.add.text(30, 25, "score: 0", {
      font: "18px Arial",
      fill: "#ffffff",
    });


    this.patient1Label = this.add.text(this.game.config.width/2-100, this.game.config.height/2+30, "Problem Unknown", {
      font: "10px Arial",
      fill: "#ffffff",
    });

    this.patient2Label = this.add.text(this.game.config.width/2-100, this.game.config.height/2-70, "Problem Unknown", {
      font: "10px Arial",
      fill: "#ffffff",
    });

    this.patient3Label = this.add.text(this.game.config.width/2, this.game.config.height/2-170, "Problem Unknown", {
      font: "10px Arial",
      fill: "#ffffff",
    });

    this.patient4Label = this.add.text(this.game.config.width/2, this.game.config.height/2+130, "Problem Unknown", {
      font: "10px Arial",
      fill: "#ffffff",
    });

    this.problem1 = "Runny Nose";
    this.problem2 = "Runny Nose";
    this.problem3 = "Runny Nose";
    this.problem4 = "Runny Nose";
    let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];


    this.problem1 = Phaser.Math.RND.pick(problemset);
    this.problem2 = Phaser.Math.RND.pick(problemset);
    this.problem3 = Phaser.Math.RND.pick(problemset);
    this.problem4 = Phaser.Math.RND.pick(problemset);
    
    this.problemsev1 = 1;
    this.problemsev2 = 1;
    this.problemsev3 = 1;
    this.problemsev4 = 1;
    this.problemsevs1 = 2;
    this.problemsevs2 = 2;
    this.problemsevs3 = 2;
    this.problemsevs4 = 2;

    this.score = 0;


    this.jumpSound = this.sound.add("jump");
    this.coinSound = this.sound.add("coin");
    this.deadSound = this.sound.add("dead");

    // TODO 4.2: Add emitter for particle system.
  }

  /**
   * Creates the walls of the game
   */
  createWalls() {
    let map = this.add.tilemap("map");
    let tileset = map.addTilesetImage("tileset", "tileset");
    this.walls = map.createLayer("Level 1", tileset);
    this.walls.setCollisionByExclusion(-1);

  }

  /**
   * Phaser calls this function once a frame (60 times a second).
   *
   * Use this function to move the player in response to actions,
   * check for win conditions, etc.
   */
  update() {

    // TODO 5.1: 

    this.movePlayer();
    this.checkCoinCollisions();
    this.checkPatient1Collisions();
    this.checkPatient2Collisions();
    this.checkPatient3Collisions();
    this.checkPatient4Collisions();

    // If the player goes out of bounds (ie. falls through a hole),
    // the player dies
    if (this.player.y > this.game.config.height || this.player.y < 0) {
      this.handlePlayerDeath();


    }
    
  }

  /**
   * Handles moving the player with the arrow keys
   */
  movePlayer() {
    // check for active input
    if (this.cursors.left.isDown) {
      // move left
      this.player.body.velocity.x = -200;
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      // move right
      this.player.body.velocity.x = 200;
      this.player.anims.play("right", true);
    } else {
      // stop moving in the horizontal
      this.player.body.velocity.x = 0;
      this.player.setFrame(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      // jump if the player is on the ground
      this.player.body.velocity.y = -500;
      this.jumpSound.play();
    }
  }

  /**
   * Check to see whether the player has collided with any coins
   */
  checkPatient1Collisions(){
    if (this.physics.overlap(this.player, this.patient1)){
      this.patient1Label.setText("Problem: " + this.problem1);
      if (this.key1.isDown){

        if (this.problemsev1 ===1){
          this.score += 5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs1 ===1){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+50, "patient1");
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem1 = Phaser.Math.RND.pick(problemset);
            
        }
        });
      }
      else if (this.key2.isDown){
        if (this.problemsev1 ===2){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs1 ===2){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+50, "patient1");
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem1 = Phaser.Math.RND.pick(problemset);
            
        }
        });
      }
      else if (this.key3.isDown){
        if (this.problemsev1 ===3){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs1 ===3){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+50, "patient1");
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem1 = Phaser.Math.RND.pick(problemset);
            
        }
        });
      }
      
    }
  }
  checkPatient2Collisions(){
    if (this.physics.overlap(this.player, this.patient2)){
      this.patient2Label.setText("Problem: " + this.problem2);
      if (this.key1.isDown){

        if (this.problemsev2 ===1){
          this.score += 5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs2 ===1){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-50, "patient2");
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem2 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        if (this.problemsev2 ===2){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs2 ===2){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-50, "patient2");
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem2 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        if (this.problemsev2 ===3){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs2 ===3){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-50, "patient2");
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem2 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      
    }
  }
  checkPatient3Collisions(){
    if (this.physics.overlap(this.player, this.patient3)){
      this.patient3Label.setText("Problem: " + this.problem3);
      if (this.key1.isDown){

        if (this.problemsev3 ===1){
          this.score += 5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs3 ===1){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-150, "patient3");
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem3 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        if (this.problemsev3 ===2){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs3 ===2){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-150, "patient3");
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem3 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        if (this.problemsev3 ===3){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs3 ===3){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2-150, "patient3");
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem3 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      
    }
  }
  checkPatient4Collisions(){
    if (this.physics.overlap(this.player, this.patient4)){
      this.patient4Label.setText("Problem: " + this.problem4);
      if (this.key1.isDown){

        if (this.problemsev4 ===1){
          this.score += 5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs4 ===1){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+150, "patient4");
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem4 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        if (this.problemsev4 ===2){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs4 ===2){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+150, "patient4");
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem4 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        if (this.problemsev4 ===3){
          this.score+=5;
          this.scoreLabel.setText("score: " + this.score);
        }
        if (this.problemsevs4 ===3){
          this.score += 2;
          this.scoreLabel.setText("score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2, this.game.config.height/2+150, "patient4");
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, Treatment 1 = Antibiotics, Treatment 2 = Antihistamine, Treatment 3 = Decongestant", 
"Cough, Treatment 1 = Honey and fluids, Treatment 2 = Antibiotics, Treatment 3 = Cough Suppressant",
"Seasonal Allergies, Treatment 1 = Antihistamine, Treatment 2 = Steroid nasal spray, Treatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), Treatment 1 = Insulin, Treatment 2 = Topical steroid cream, Treatment 3 = Steroid Nasal Spray", 
"Wheezing, Treatment 1 = Steroids, Treatment 2 = Ice Pack, Treatment 3 = Bronchodilator Inhaler",
"Dehydration, Treatment 1 = IV Fluids, Treatment 2 = Oral rehydration, Treatment 3 = Cough Syrup",
"Eye Irritation, Treatment 1 = Ear Drops, Treatment 2 = Saline Irrigation, Treatment 3 = Artificial Tears",
"Minor Cuts (stitches required), Treatment 1 = Sterile Dressing, Treatment 2 = Antacid, Treatment 3 = Clean and suture",
 "Sprains, Treatment 1 = RICE protocol, Treatment 2 = Ankle Brace, Treatment 3 = Antibiotics",
 "Sinus Pain, Treatment 1 = Chemotherapy, Treatment 2 = Decongestant, Treatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), Treatment 1 = Oral Fluids, Treatment 2 = Cast, Treatment 3 = Antiemetic",
"Diarrhea, Treatment 1 = Oral Rehydration, Treatment 2 = Anti-Diarrheal, Treatment 3 = Inhaler",
"Minor Burns, Treatment 1 = Cough Drops, Treatment 2 = Cool water and dressing, Treatment 3 = Silver Cream",
"Urinary Tract Infection, Treatment 1 = Urine Culture, Treatment 2 = Ice Pack, Treatment 3 = Antibiotics",
"Fever (>103F), Treatment 1 = IV fluids and antipyretic, Treatment 2 = Blood tests, Treatment 3 = Bandage",
"Worst headache ever, Treatment 1 = Cough Syrup, Treatment 2 = CT scan, Treatment 3 = Pain control",
"Broken Bones (visible), Treatment 1 = Pain control, Treatment 2 = Antihistamine, Treatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, Treatment 1 = Stroke protocol tPA eval, Treatment 2 = CT scan, Treatment 3 = Allergy Meds",
"Uncontrollable Bleeding, Treatment 1 = Direct pressure and surgical repair, Treatment 2 = Ice Cream, Treatment 3 = Blood Transfusion",
"Unresponsive, Treatment 1 = IV access, Treatment 2 = Water, Treatment 3 = Airway support and oxygen",
"Trouble Breathing, Treatment 1 = Oxygen and bronchodilator, Treatment 2, Steroids, Treatment 3 = Heating pad"];
            this.problem4 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      
    }
  }

  checkCoinCollisions() {
    if (this.physics.overlap(this.player, this.coin)) {
      // the player has taken a coin!
      // add 5 to the score
      this.score += 5;
      // update the score label
      this.scoreLabel.setText("score: " + this.score);
      // move the coin to a new spot
      this.moveCoin();
      this.coinSound.play();
    }
  }



  /**
   * Create a new enemy
   */
  addEnemy() {
    // create the enemy sprite at (250, -10)
    let enemy = this.enemies.create(this.game.config.width/2, 0, "enemy");

    // add gravity to the enemy to make it fall
    enemy.body.gravity.y = 320;

    // randomly make the enemy move left or right
    enemy.body.velocity.x = Phaser.Math.RND.pick([-200, 200]);
    // when the enemy hits a left or right wall, we want it to
    // bounce back in the opposite direction without losing speed
    enemy.body.bounce.x = 1;


    // destroy the enemy after 15 seconds
    // this is roughly how long it takes to fall through the hole
    this.time.addEvent({
      delay: 15000,
      callback: () => enemy.destroy(),
    });
  }

  /**
   * Called when the player dies. Restart the game
   */
  handlePlayerDeath() {
    // TODO 5.1: EXPLODE!!
    this.scene.restart();
    this.deadSound.play();


    // TODO 5.2: Instead of immediately restarting the game, add a delay
    // Hint: see addEnemy()

  }
}

// TODO 3.1: Update the map config so that the width is 800 and the height is 560 
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 560,
  scene: GameScene,
  physics: {
    default: "arcade",
  },
  backgroundColor: "#3498db",
};

const game = new Phaser.Game(config);
