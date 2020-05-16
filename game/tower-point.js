class TowerPoint {
    constructor(pos) {
        this.pos = pos;
        this.originalSize = this.size = 30;
        this.hoverSize = 50;
        this.tower = null;
    }

    display() {
        if (!this.tower) {
            push();
            translate(this.pos.x, this.pos.y);
            ellipseMode(CENTER);
            fill(20);
            noStroke();
            ellipse(0, 0, this.size, this.size);
            pop();
        } else {
            this.tower.display();
        }
    }

    follow(enemies) {
        if (this.tower) {
            this.tower.follow(enemies);
        }
    }

    fire() {
        if (this.tower) {
            return this.tower.fire();
        }

        return null;
    }

    update() {
        const mousePos = createVector(mouseX, mouseY);
        const isWithinMouse = mousePos.dist(this.pos) < this.size / 2;

        this.size = isWithinMouse ? this.hoverSize : this.originalSize;

        if (this.tower) {
            this.tower.update();
        }

        if (isWithinMouse && mouseIsPressed && !this.tower) {
            this.tower = new Tower({
                pos: this.pos.copy(),
                damage: 5,
                bulletSpeed: 5,
                attackRate: 10,
                range: 200,
                type: TowerType.TOWER1,
                bulletType: BulletType.BULLET1
            });
        }
    }
}