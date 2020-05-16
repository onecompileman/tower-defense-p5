class GameManager {

    constructor() {
        this.initEnemyPaths();
        this.initTowerPoints();
        this.initEnemies();
        this.initBullets();
    }

    initEnemyPaths() {
        this.enemyPaths = LevelData[0].enemyPaths.map(([x, y]) => {
            return createVector(x, y);
        });;
    }

    initTowerPoints() {
        this.towerPoints = LevelData[0].towerPoints.map(([x, y]) => {
            return new TowerPoint(createVector(x, y));
        });
    }

    initBullets() {
        this.bullets = [];
    }

    initEnemies() {
        this.enemies = [];

        const enemy = new Enemy({
            pos: this.enemyPaths[0].copy(),
            damage: 10,
            type: EnemyType.ENEMY1,
            life: 100,
            enemyPaths: this.enemyPaths,
            size: createVector(20, 20),
            speed: 1
        });

        this.enemies.push(enemy);
    }

    generateEnemies() {
        if (frameCount % 50 === 0) {
            const enemy = new Enemy({
                pos: this.enemyPaths[0].copy(),
                damage: 10,
                type: EnemyType.ENEMY1,
                life: 100,
                enemyPaths: this.enemyPaths,
                size: createVector(20, 20),
                speed: 1
            });

            this.enemies.push(enemy);
        }
    }

    renderBullets() {
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            bullet.display();

            return !bullet.isCollided;
        });
    }

    renderEnemy() {

        this.generateEnemies();
        this.enemies = this.enemies.filter(enemy => {
            enemy.update();
            enemy.display();

            return !enemy.isDead();
        })
    }

    renderEnemyPath() {
        for (let i = 0; i < this.enemyPaths.length - 1; i++) {
            const v1 = this.enemyPaths[i];
            const v2 = this.enemyPaths[i + 1];
            strokeWeight(65);
            stroke(20);
            line(v1.x, v1.y, v2.x, v2.y);
        }
    }

    renderTowerPoints() {
        this.towerPoints.forEach(towerPoint => {
            towerPoint.follow(this.enemies);
            towerPoint.update();
            towerPoint.display();

            const bullet = towerPoint.fire();
            if (bullet) {
                this.bullets.push(bullet);
            }
        });
    }

    render() {
        this.renderEnemyPath();
        this.renderBullets();
        this.renderTowerPoints();
        this.renderEnemy();
    }

}