class Tower {
    constructor(option) {
        this.pos = option.pos;
        this.damage = option.damage;
        this.bulletSpeed = option.bulletSpeed;
        this.attackRate = option.attackRate;
        this.range = option.range;
        this.type = option.type;
        this.bulletType = option.bulletType;

        this.attackCooldown = 0;
        this.rotation = 0;

        this.closestEnemy = null;
    }

    update() {
        this.attackCooldown--;
    }

    display() {
        switch (this.type) {
            case TowerType.TOWER1:
                push();
                translate(this.pos.x, this.pos.y);
                rotate(this.rotation);
                ellipseMode(CENTER);
                rectMode(CENTER);
                stroke(171, 100, 68, 255);
                strokeWeight(4);
                noFill();
                ellipse(0, 0, 40, 40);
                rect(20, 0, 25, 10);
                pop();
                break;
        }
    }

    follow(enemies) {
        this.closestEnemy = enemies.reduce((closests, enemy) => {
            const distance = enemy.pos.dist(this.pos);

            if (distance <= this.range) {
                if (closests == null || closests.pos.dist(this.pos) > distance) {
                    closests = enemy;
                }
            }

            return closests;
        }, null);

        if (this.closestEnemy) {
            this.rotation = this.closestEnemy.pos.copy().sub(this.pos).heading();
        }
    }

    fire() {
        if (this.closestEnemy && this.attackCooldown <= 0) {
            this.attackCooldown = this.attackRate;

            const offsetPos = this.closestEnemy.pos.copy().sub(this.pos);
            offsetPos.normalize().mult(30);

            const bullet = new Bullet({
                pos: this.pos.copy().add(offsetPos),
                enemyToFollow: this.closestEnemy,
                damage: this.damage,
                speed: this.bulletSpeed,
                type: BulletType.BULLET1,
                size: createVector(12, 12)
            });

            return bullet;
        }

        return null;
    }
}