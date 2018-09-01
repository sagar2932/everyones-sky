class Camera {

    constructor() {
        this.x = this.y = 0;
        this.shakeX = this.shakeY = 0;

        this.zoomScale = this.targetScale = 1;
        // this.targetScaleOverride = null; // for reference only
    }

    cycle(e) {
        let minDistance = 999;
        U.bodies.forEach(body => {
            minDistance = min(minDistance, dist(body, U.playerShip));
        });

        if (minDistance > BODY_UNZOOM_THRESHOLD) {
            this.targetScale = 0.5;
        } else if (minDistance < BODY_ZOOM_THRESHOLD) {
            this.targetScale = 1;
        }

        const targetScale = this.targetScaleOverride || this.targetScale;

        this.zoomScale += limit(-0.5 * e, targetScale - this.zoomScale, 0.5 * e);

        this.width = (CANVAS_WIDTH / this.zoomScale);
        this.height = (CANVAS_HEIGHT / this.zoomScale);

        if ((this.shakeTime -= e) > 0) {
            this.shakeX = rnd(-10, 10);
            this.shakeY = rnd(-10, 10);
        }

        this.x = U.playerShip.x - this.width / 2 + this.shakeX;
        this.y = U.playerShip.y - this.height / 2 + this.shakeY;
    }

    isVisible(x, y, radius = 0) {
        return x + radius > this.x &&
            y + radius > this.y &&
            x - radius < this.x + this.width &&
            y - radius < this.y + this.height;
    }

    shake(duration) {
        this.shakeTime = max(this.shakeTime || 0, duration);
    }

}
