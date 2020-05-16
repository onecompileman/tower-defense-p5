class Bullet {
    constructor(option) {
        this.pos = option.pos;
        this.enemyToFollow = option.enemyToFollow;
        this.damage = option.damage;
        this.speed = option.speed;
        this.type = option.type;
        this.size = option.size;

        this.isCollided = false;
        this.vel = createVector(0, 0);
    }

    update() {
        this.follow();
        this.pos.add(this.vel);
    }

    display() {

        switch (this.type) {
            case BulletType.BULLET1:
                push();
                translate(this.pos.x, this.pos.y);
                ellipseMode(CENTER);
                stroke(91, 100, 68, 255);
                strokeWeight(2);
                noFill();
                ellipse(0, 0, this.size.x, this.size.y);
                pop();
                break;
        }
    }

    follow() {
        if (this.enemyToFollow) {
            if (this.enemyToFollow.pos.dist(this.pos) <= this.enemyToFollow.size.x / 2) {
                this.enemyToFollow.takeDamage(this.damage);

                this.isCollided = true;
            }
            this.vel = this.enemyToFollow.pos.copy().sub(this.pos);

            this.vel.normalize().mult(this.speed);

        } else {
            this.isCollided = true;
        }
    }
}