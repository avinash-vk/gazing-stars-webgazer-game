class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas?.getContext("2d");
    this.playerPos = this.canvas.width / 2;
    this.baseY = this.canvas.height - 12; // BASE coordinate of the frame.
    this.sensitivity = 8;
    this.player = document.getElementById("player");
    this.spawnCount = 0;
    this.spawnPoints = [0, 0.1, 0.2, 0.33, 0.5, 0.66, 0.8, 0.9, 1];
    this.spawns = [];
    document.addEventListener("keydown", () => this.moveBucket());
    this.score = 0;
  }
  start() {
    this.loop();
    setTimeout(() => this.initStars(), 0);
  }
  initStars() {
    console.log("init");
    setInterval(() => {
      console.log("call spawn");
      this.createSpawn();
    }, 2000);
  }
  checkCollisions(
    x1,
    y1,
    x2 = this.playerPos,
    y2 = this.baseY,
    w1 = 10,
    h1 = 10,
    w2 = 20,
    h2 = 20
  ) {
    if (
      x1 + w1 >= x2 &&
      x1 + w1 <= x2 + w2 &&
      y1 + h1 >= y2 &&
      y1 + h1 <= y2 + h2
    ) {
      return true;
    } else if (x1 >= x2 && x1 <= x2 + w2 && y1 >= y2 && y1 <= y2 + h2) {
      return true;
    } else {
      return false;
    }
  }
  createSpawn() {
    let spawn = new Image();
    spawn.src =
      "http://cdn.shopify.com/s/files/1/1061/1924/products/Star_Emoji_grande.png?v=1571606063";
    let spawnObj = {
      id: this.spawnCount,
      spawn,
      x: this.spawnPoints[Math.floor(Math.random() * 9)] * this.canvas.width,
      y: 0,
    };
    this.spawnCount += 1;
    console.log("Created spawn");
    this.spawns.push(spawnObj);
  }
  drawScore() {
    let scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = this.score;
  }
  clearRect() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  loop() {
    requestAnimationFrame(() => this.loop());
    this.clearRect();
    this.drawBucket();
    this.spawns.forEach((spawn) => {
      spawn.y += 1;
      if (this.checkCollisions(spawn.x, spawn.y)) {
        this.score += 1;
        this.spawns = this.spawns.filter((spawnx) => spawnx.id !== spawn.id);
      } else {
        this.drawSpawn(spawn);
      }
    });

    this.drawScore();
  }
  drawSpawn(spawn) {
    this.ctx.beginPath();
    this.ctx.drawImage(spawn.spawn, spawn.x, spawn.y, 10, 10);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBucket() {
    this.clearRect();
    this.ctx.beginPath();
    this.ctx.drawImage(this.player, this.playerPos, this.baseY, 20, 20);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  moveBucket(e) {
    e = e || window.event;

    console.log(this.playerPos, this.canvas.width);
    if (e.keyCode == "37" && this.playerPos > 6) {
      this.playerPos -= this.sensitivity;
    } else if (e.keyCode == "39" && this.playerPos < this.canvas.width - 24) {
      this.playerPos += this.sensitivity;
    }
  }
  moveBucketWithWebgazer(x) {
    x = x * (this.canvas.width / screen.width);
    console.log(x, this.canvas.width);
    if (x <= 6) {
      this.playerPos = 6;
    } else if (x >= this.canvas.width - 24) {
      this.playerPos = this.canvas.width - 24;
    } else {
      this.playerPos = x;
    }
  }
}
