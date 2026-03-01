import Phaser from "phaser";
const problemSeverityMap = {
  "Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant": {
    sev1: 2,
    sevs1: 3
  },
  

  "Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant": {
    sev1: 3,
    sevs1: 1
  },

  "Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics": {
    sev1: 1,
    sevs1: 2
  },

  "Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray": {
    sev1: 2,
    sevs1: 3
  },

  "Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler": {
    sev1: 3,
    sevs1: 1
  },

  "Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup": {
    sev1: 1,
    sevs1: 2
  },

  "Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears": {
    sev1: 2,
    sevs1: 3
  },

  "Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture": {
    sev1: 3,
    sevs1: 1
  },

  "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics": {
    sev1: 1,
    sevs1: 2
  },

  "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid": {
    sev1: 2,
    sevs1: 3
  },

  "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic": {
    sev1: 3,
    sevs1: 1
  },

  "Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler": {
    sev1: 1,
    sevs1: 2
  },

  "Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream": {
    sev1: 2,
    sevs1: 3
  },

  "Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics": {
    sev1: 3,
    sevs1: 1
  },

  "Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage": {
    sev1: 1,
    sevs1: 2
  },

  "Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control": {
    sev1: 2,
    sevs1: 3
  },

  "Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray": {
    sev1: 3,
    sevs1: 1
  },

  "Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds": {
    sev1: 1,
    sevs1: 2
  },

  "Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion": {
    sev1: 2,
    sevs1: 3
  },

  "Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen": {
    sev1: 3,
    sevs1: 1
  },

  "Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad": {
    sev1: 1,
    sevs1: 2
  }
};
class GameScene extends Phaser.Scene {
  /**
   * Load any assets you might need here!
   */
  preload() {
    this.load.setPath("/assets/");
    this.load.spritesheet("player", "player3.png", {
      frameWidth: 20,
      frameHeight: 30,
    });

    // TODO 1: load the tileset and tilemap with keys of "tileset" and "map" respectively.
    this.load.image("tileset", "tileset.png");
    this.load.tilemapTiledJSON("map", "my_map3.json");
    
    this.load.image("hospital", "hospital3.png")
    

    this.load.image("coin", "coin.png");
    this.load.image("enemy", "enemy.png");


    this.load.image("patient1", "patient.png", {frameWidth: 20, frameHeight: 30});
    this.load.image("patient2", "patient.png", {frameWidth: 20, frameHeight: 30});
    this.load.image("patient3", "patient.png", {frameWidth: 20, frameHeight: 30});
    this.load.image("patient4", "patient.png", {frameWidth: 20, frameHeight: 30});


    this.load.audio("jump", ["jump.ogg", "jump.mp3"]);
    this.load.audio("coin", ["coin.ogg", "coin.mp3"]);
    this.load.audio("dead", ["dead.ogg", "dead.mp3"]);
    
  }

  /**
   * Called once. Create any objects you need here!
   */
  create() {
    this.hospital = this.add.image(this.game.config.width/2, this.game.config.height/2, "hospital");

    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    // create the player sprite
    this.player = this.physics.add.sprite(this.game.config.width/10, this.game.config.height-50, "player");
    this.player.setScale(1.5);
    this.patient1 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2+50, "patient1");
    this.patient1.setScale(1.5);
    this.patient2 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2-50, "patient2");
    this.patient2.setScale(1.5);
    this.patient3 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2-150, "patient3");
    this.patient3.setScale(1.5);
    this.patient4 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2+150, "patient4");
    this.patient4.setScale(1.5);
    // player movement animations
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {frames: [0, 1]}),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", {frames: [2]}),
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
    this.player.body.gravity.y = 1500;

    // create arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    this.createWalls();

    // Make the player collide with walls
    this.physics.add.collider(this.player, this.walls);


    // Display the score
    this.scoreLabel = this.add.text(30, 125, "Score: 0", {
      font: "18px Arial",
      fill: "#ffffff",
    });
    this.link = this.add.text(120, 125, "Link for more information:\nhttps://docs.google.com/spreadsheets/d/17u7zdPFq004OOZEMA9_dhUYIreTX2r5JX9YRQ98Frz8/edit?gid=0#gid=0", {
      font: "bold 12px Arial",
      fill: "#ffffff",})

    this.patient1Label = this.add.text(this.game.config.width/2-190, this.game.config.height/2-15, "Problem Unknown", {
      font: "bold 14px Arial",
      fill: "#ffffff",
    });
    

    this.patient2Label = this.add.text(this.game.config.width/2+40, this.game.config.height/2-115, "Problem Unknown", {
      font: "bold 14px Arial",
      fill: "#ffffff",
    });

    this.patient3Label = this.add.text(this.game.config.width/2-190, this.game.config.height/2-215, "Problem Unknown", {
      font: "bold 14px Arial",
      fill: "#ffffff",
    });

    this.patient4Label = this.add.text(this.game.config.width/2+40, this.game.config.height/2+85, "Problem Unknown", {
      font: "bold 14px Arial",
      fill: "#ffffff",
    });

    this.problem1 = "Runny Nose";
    this.problem2 = "Runny Nose";
    this.problem3 = "Runny Nose";
    this.problem4 = "Runny Nose";
    let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];


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
    this.walls.setCollision(1);

  }

  /**
   * Phaser calls this function once a frame (60 times a second).
   *
   * Use this function to move the player in response to actions,
   * check for win conditions, etc.
   */
  update() {
    const data1 = problemSeverityMap[this.problem1];

    if (data1) {
      this.problemsev1 = data1.sev1;
      this.problemsevs1 = data1.sevs1;
    }
    const data2 = problemSeverityMap[this.problem2];
    if (data2) {
      this.problemsev2 = data2.sev1;
      this.problemsevs2 = data2.sevs1;
    }
    const data3 = problemSeverityMap[this.problem3];
    if (data3) {
      this.problemsev3 = data3.sev1;
      this.problemsevs3 = data3.sevs1;
    }
    const data4 = problemSeverityMap[this.problem4];
    if (data4) {
      this.problemsev4 = data4.sev1;
      this.problemsevs4 = data4.sevs1;
    }
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
      this.player.body.velocity.y = -400;

    }
  }

  /**
   * Check to see whether the player has collided with any coins
   */
  checkPatient1Collisions(){
    

    if (this.physics.overlap(this.player, this.patient1)){
      this.patient1Label.setText("Problem: " + this.problem1);
      if (this.key1.isDown){
        this.patient1Label.setText("Treatment Done!");
        if (this.problemsev1 ===1){
          this.score += 5;
          this.scoreLabel.setText("Score: " + this.score);
          
        }
        if (this.problemsevs1 ===1){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2+50, "patient1");
            this.patient1.setScale(1.5);
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem1 = Phaser.Math.RND.pick(problemset);
            
        }
        });
      }
      else if (this.key2.isDown){
        this.patient1Label.setText("Treatment Done!");
        if (this.problemsev1 ===2){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs1 ===2){
          this.score += 2;
          this.scoreLabel.setText("Score:" + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2+50, "patient1");
            this.patient1.setScale(1.5);
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem1 = Phaser.Math.RND.pick(problemset);
            
        }
        });
      }
      else if (this.key3.isDown){
        this.patient1Label.setText("Treatment Done!");
        if (this.problemsev1 ===3){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs1 ===3){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient1.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient1 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2+50, "patient1");
            this.patient1.setScale(1.5);
            this.patient1Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
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
        this.patient2Label.setText("Treatment Done!");

        if (this.problemsev2 ===1){
          this.score += 5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs2 ===1){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2-50, "patient2");
            this.patient2.setScale(1.5);
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem2 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        this.patient2Label.setText("Treatment Done!");
        if (this.problemsev2 ===2){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs2 ===2){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2-50, "patient2");
            this.patient2.setScale(1.5);
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem2 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        this.patient2Label.setText("Treatment Done!");
        if (this.problemsev2 ===3){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs2 ===3){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient2.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient2 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2-50, "patient2");
            this.patient2.setScale(1.5);
            this.patient2Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
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
        this.patient3Label.setText("Treatment Done!");

        if (this.problemsev3 ===1){
          this.score += 5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs3 ===1){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2-150, "patient3");
            this.patient3.setScale(1.5);
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem3 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        this.patient3Label.setText("Treatment Done!");
        if (this.problemsev3 ===2){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs3 ===2){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2-150, "patient3");
            this.patient3.setScale(1.5);
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem3 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        this.patient3Label.setText("Treatment Done!");
        if (this.problemsev3 ===3){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs3 ===3){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient3.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient3 = this.physics.add.sprite(this.game.config.width/2-230, this.game.config.height/2-150, "patient3");
            this.patient3.setScale(1.5);
            this.patient3Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
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
        this.patient4Label.setText("Treatment Done!");

        if (this.problemsev4 ===1){
          this.score += 5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs4 ===1){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2+150, "patient4");
            this.patient4.setScale(1.5);
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem4 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key2.isDown){
        this.patient4Label.setText("Treatment Done!");
        if (this.problemsev4 ===2){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs4 ===2){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2+150, "patient4");
            this.patient4.setScale(1.5);
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
            this.problem4 = Phaser.Math.RND.pick(problemset);
        }
        });
      }
      else if (this.key3.isDown){
        this.patient4Label.setText("Treatment Done!");
        if (this.problemsev4 ===3){
          this.score+=5;
          this.scoreLabel.setText("Score: " + this.score);
        }
        if (this.problemsevs4 ===3){
          this.score += 2;
          this.scoreLabel.setText("Score: " + this.score);
        }
        this.patient4.destroy();
        this.time.addEvent({
          delay: 8000,
          callback: () => {
            this.patient4 = this.physics.add.sprite(this.game.config.width/2+230, this.game.config.height/2+150, "patient4");
            this.patient4.setScale(1.5);
            this.patient4Label.setText("Problem Unknown");
            let problemset = ["Runny Nose, \nTreatment 1 = Antibiotics, \nTreatment 2 = Antihistamine, \nTreatment 3 = Decongestant", 
"Cough, \nTreatment 1 = Honey and fluids, \nTreatment 2 = Antibiotics, \nTreatment 3 = Cough Suppressant",
"Seasonal Allergies, \nTreatment 1 = Antihistamine, \nTreatment 2 = Steroid nasal spray, \nTreatment 3 = Antibiotics", 
"Skin rashes (non-rapidly spreading), \nTreatment 1 = Insulin, \nTreatment 2 = Topical steroid cream, \nTreatment 3 = Steroid Nasal Spray", 
"Wheezing, \nTreatment 1 = Steroids, \nTreatment 2 = Ice Pack, \nTreatment 3 = Bronchodilator Inhaler",
"Dehydration, \nTreatment 1 = IV Fluids, \nTreatment 2 = Oral rehydration, \nTreatment 3 = Cough Syrup",
"Eye Irritation, \nTreatment 1 = Ear Drops, \nTreatment 2 = Saline Irrigation, \nTreatment 3 = Artificial Tears",
"Minor Cuts (stitches required), \nTreatment 1 = Sterile Dressing, \nTreatment 2 = Antacid, \nTreatment 3 = Clean and suture",
 "Sprains, \nTreatment 1 = RICE protocol, \nTreatment 2 = Ankle Brace, \nTreatment 3 = Antibiotics",
 "Sinus Pain, \nTreatment 1 = Chemotherapy, \nTreatment 2 = Decongestant, \nTreatment 3 = Nasal Steroid",
 "Vomiting (no severe dehydration), \nTreatment 1 = Oral Fluids, \nTreatment 2 = Cast, \nTreatment 3 = Antiemetic",
"Diarrhea, \nTreatment 1 = Oral Rehydration, \nTreatment 2 = Anti-Diarrheal, \nTreatment 3 = Inhaler",
"Minor Burns, \nTreatment 1 = Cough Drops, \nTreatment 2 = Cool water and dressing, \nTreatment 3 = Silver Cream",
"Urinary Tract Infection, \nTreatment 1 = Urine Culture, \nTreatment 2 = Ice Pack, \nTreatment 3 = Antibiotics",
"Fever (>103F), \nTreatment 1 = IV fluids and antipyretic, \nTreatment 2 = Blood tests, \nTreatment 3 = Bandage",
"Worst headache ever, \nTreatment 1 = Cough Syrup, \nTreatment 2 = CT scan, \nTreatment 3 = Pain control",
"Broken Bones (visible), \nTreatment 1 = Pain control, \nTreatment 2 = Antihistamine, \nTreatment 3 = Inmobilize and X-ray",
"Face Drooping, Arm Weakness, Speech Difficulty, \nTreatment 1 = Stroke protocol tPA eval, \nTreatment 2 = CT scan, \nTreatment 3 = Allergy Meds",
"Uncontrollable Bleeding, \nTreatment 1 = Direct pressure and surgical repair, \nTreatment 2 = Ice Cream, \nTreatment 3 = Blood Transfusion",
"Unresponsive, \nTreatment 1 = IV access, \nTreatment 2 = Water, \nTreatment 3 = Airway support and oxygen",
"Trouble Breathing, \nTreatment 1 = Oxygen and bronchodilator, \nTreatment 2 = Steroids, \nTreatment 3 = Heating pad"];
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
      this.scoreLabel.setText("Score: " + this.score);
      // move the coin to a new spot
      this.moveCoin();

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
  height: 760,
  scene: GameScene,
  physics: {
    default: "arcade",
  },
  backgroundColor: "#3498db",
};

const game = new Phaser.Game(config);

