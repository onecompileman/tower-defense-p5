class Enemy {
    constructor(option) {
        this.pos = option.pos;
        this.damage = option.damage;
        this.type = option.type;
        this.life = option.life;
        this.enemyPaths = option.enemyPaths;
        this.size = option.size;
        this.speed = option.speed;

        this.currentPathIndex = 1;

        this.takeDamageCooldown = 0;

        this.rotation = 0;

        this.vel = createVector(0, 0);
    }

    update() {
        this.followPath();

        this.pos.add(this.vel);

        this.takeDamageCooldown--;

        this.rotation += 0.1;
    }

    followPath() {
        this.vel = this.enemyPaths[this.currentPathIndex].copy().sub(this.pos);
        this.vel.normalize().mult(this.speed);

        const threshold = this.speed / 2;

        if (this.currentPathIndex < this.enemyPaths.length - 1 && this.pos.dist(this.enemyPaths[this.currentPathIndex]) <= threshold) {
            this.currentPathIndex++;
        }
    }

    takeDamage(damage) {
        this.life -= damage;
        this.takeDamageCooldown = 3;
    }

    isDead() {
        return this.life <= 0;
    }

    display() {
        switch (this.type) {
            case EnemyType.ENEMY1:
                push();
                translate(this.pos.x, this.pos.y);
                rectMode(CENTER);
                if (this.takeDamageCooldown > 0) {
                    stroke(100, 150, 100, 255);
                } else {
                    stroke(310, 100, 68, 255);
                }
                rotate(this.rotation);
                noFill();
                strokeWeight(5);
                rect(0, 0, this.size.x, this.size.y);
                pop();
                break;
        }
    }
}