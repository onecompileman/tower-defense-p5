class GameManager {

    constructor() {
        this.initSoundManager();
        this.initEnemyPaths();
        this.initTowerPoints();
        this.initEnemies();
        this.initBullets();
        this.initParticleSystems();
    }

    initParticleSystems() {
        this.particleSystems = [];
    }

    initSoundManager() {
        this.soundManager = new SoundManager();
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

            if (bullet.isCollided) {
                const particleSystem = new ParticleSystem({
                    count: 3,
                    cols: [color(91, 100, 68, 255), color(53, 96, 57, 255)],
                    shape: 'rect',
                    size: createVector(10, 10),
                    life: 40,
                    position: bullet.pos.copy()
                });
                this.particleSystems.push(particleSystem);

                return false;
            }

            return true;
        });
    }

    renderEnemy() {

        this.generateEnemies();
        this.enemies = this.enemies.filter(enemy => {
            enemy.update();
            enemy.display();

            if (enemy.isDead()) {
                const particleSystem = new ParticleSystem({
                    count: 6,
                    cols: [color(91, 100, 68, 255), color(310, 100, 68, 255)],
                    shape: 'rect',
                    size: createVector(30, 30),
                    life: 60,
                    position: enemy.pos.copy()
                });
                this.particleSystems.push(particleSystem);

                this.soundManager.playSound("enemyExplode", 1);

                return false;
            }

            return true;
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
                this.soundManager.playSound("playerShoot", 0.05);
                this.bullets.push(bullet);
            }
        });
    }

    renderParticleSystem() {
        this.particleSystems = this.particleSystems.filter(ps => {
            ps.render();
            return !ps.isDead();
        });
    }

    render() {
        this.renderEnemyPath();
        this.renderBullets();
        this.renderTowerPoints();
        this.renderEnemy();
        this.renderParticleSystem();
    }

}