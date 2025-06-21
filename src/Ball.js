/**
 * Represents a basketball object consisting of a textured sphere with seam lines and a ground shadow.
 * @extends THREE.Group
 */
export class Ball extends THREE.Group {
  /**
   * Initializes the basketball group and triggers creation of its geometry.
   */
  constructor() {
    super();
    this.createBasketball();
  }

  /**
   * Builds the basketball sphere, adds seam lines and a ground shadow, and attaches them to this group.
   * @private
   */
  createBasketball() {
    const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0xd2691e,
      shininess: 20,
      specular: 0x442211,
      bumpScale: 0.01,
    });
    const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
    basketball.position.set(0, 0.4, 0);
    basketball.castShadow = true;
    basketball.receiveShadow = true;
    this.add(basketball);
    this.createBasketballSeams(0, 0.4, 0);
    const shadowGeometry = new THREE.CircleGeometry(0.4, 32);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.2,
    });
    const basketballShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    basketballShadow.rotation.x = -Math.PI / 2;
    basketballShadow.position.set(0, 0.11, 0);
    this.add(basketballShadow);
  }

  /**
   * Creates the seam lines that run along the basketball's surface.
   *
   * @param {number} x - X-coordinate of the basketball center.
   * @param {number} y - Y-coordinate of the basketball center.
   * @param {number} z - Z-coordinate of the basketball center.
   * @private
   */
  createBasketballSeams(x, y, z) {
    const seamMaterial = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      linewidth: 2,
    });
    const radius = 0.302;
    for (let seamIndex = 0; seamIndex < 6; seamIndex++) {
      const rotationY = (seamIndex * Math.PI) / 3;
      const topPoints = [];
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI;
        const localY = Math.cos(angle) * radius;
        const localRadius = Math.sin(angle) * radius;
        const localX = Math.cos(rotationY) * localRadius;
        const localZ = Math.sin(rotationY) * localRadius;
        topPoints.push(new THREE.Vector3(x + localX, y + localY, z + localZ));
      }

      const topGeometry = new THREE.BufferGeometry().setFromPoints(topPoints);
      const topSeam = new THREE.Line(topGeometry, seamMaterial);
      this.add(topSeam);

      const bottomPoints = [];
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI;
        const localY = -Math.cos(angle) * radius;
        const localRadius = Math.sin(angle) * radius;

        const localX = Math.cos(rotationY) * localRadius;
        const localZ = Math.sin(rotationY) * localRadius;

        bottomPoints.push(
          new THREE.Vector3(x + localX, y + localY, z + localZ)
        );
      }

      const bottomGeometry = new THREE.BufferGeometry().setFromPoints(
        bottomPoints
      );
      const bottomSeam = new THREE.Line(bottomGeometry, seamMaterial);
      this.add(bottomSeam);
    }
  }
}
