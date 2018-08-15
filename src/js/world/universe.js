class Universe {

    constructor() {
        this.ships = [];
        this.bodies = [];
        this.particles = [];

        // Player ship
        this.playerShip = new PlayerShip();
        this.playerShip.x = CANVAS_WIDTH / 2;
        this.playerShip.y = CANVAS_HEIGHT / 2;
        this.ships.push(this.playerShip);

        const star = new Star();
        star.x = CANVAS_WIDTH / 2 + 200;
        star.y = CANVAS_HEIGHT / 2 + 200;
        this.bodies.push(star);

        const planet = new Planet();
        planet.x = CANVAS_WIDTH / 2 - 200;
        planet.y = CANVAS_HEIGHT / 2 - 200;
        this.bodies.push(planet);
    }

    cycle(e) {
        this.ships.forEach(ship => ship.cycle(e));
    }

    render() {
        R.fillStyle = '#000';
        R.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        R.fillStyle = starsPattern;
        R.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.particles.forEach(particles => particles.render());
        this.bodies.forEach(b => wrap(() => b.render()));
        this.ships.forEach(ship => ship.render());
    }

    remove(array, item) {
        const index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

}