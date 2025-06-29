/**
 * Represents a basketball hoop setup including pole, backboard, rim and net.
 * @extends THREE.Group
 */
export class Basket extends THREE.Group {
  /**
   * Constructs a Basket at a given X position and orientation.
   *
   * @param {number} x - The X position along the court where the basket is placed.
   * @param {number} direction - Direction multiplier (1 or -1) indicating which side the basket faces.
   */
  constructor(x, direction) {
    super();
    this.direction = direction;

    this.createHoop();

    const scaleFactor = 0.5;
    this.scale.set(scaleFactor, scaleFactor, scaleFactor);

    this.position.set(x, 0, 0);
  }

  /**
   * Creates all structural parts that compose the hoop (pole, arm, backboard, rim and net).
   * @private
   */
  createHoop() {
    const direction = this.direction;
    const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 12);
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(-direction * 1.5, 6, 0);
    pole.castShadow = true;
    this.add(pole);

    const armGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.3);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.set(-direction * 0.75, 10, 0);
    arm.castShadow = true;
    this.add(arm);

    const backboardGeometry = new THREE.BoxGeometry(0.2, 3.5, 6);
    const backboardMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
    backboard.position.set(0, 10, 0);
    backboard.castShadow = true;
    backboard.receiveShadow = true;
    this.add(backboard);

    this.addBackboardRectangle(direction);

    const rimGeometry = new THREE.TorusGeometry(0.75, 0.05, 8, 16);
    const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600 });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.set(direction * 0.85, 8.5, 0);
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    this.add(rim);
    this.createNet(direction * 0.85, 8.5, 0);
  }

  /**
   * Generates the basketball net using line segments.
   *
   * @param {number} offsetX - X offset for the center of the rim.
   * @param {number} y - Y coordinate where the top of the net starts.
   * @param {number} z - Z coordinate for the rim position.
   * @private
   */
  createNet(offsetX, y, z) {
    const netMaterial = new THREE.LineBasicMaterial({
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.8,
    });
    const topRadius = 0.75;
    const bottomRadius = 0.4;
    const netLength = 1.0;
    const verticalSegments = 12;
    const horizontalSegments = 4;

    for (let i = 0; i < verticalSegments; i++) {
      const angle = (i / verticalSegments) * Math.PI * 2;

      const topX = offsetX + Math.cos(angle) * topRadius;
      const topZ = z + Math.sin(angle) * topRadius;
      const bottomX = offsetX + Math.cos(angle) * bottomRadius;
      const bottomZ = z + Math.sin(angle) * bottomRadius;

      const points = [
        new THREE.Vector3(topX, y, topZ),
        new THREE.Vector3(bottomX, y - netLength, bottomZ),
      ];

      const netGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const netLine = new THREE.Line(netGeometry, netMaterial);
      this.add(netLine);
    }

    const ringPointsCount = 32;
    for (let i = 1; i <= horizontalSegments; i++) {
      const ratio = i / horizontalSegments;
      const currentY = y - ratio * netLength;
      const currentRadius = topRadius + (bottomRadius - topRadius) * ratio;

      const ringPoints = [];
      for (let j = 0; j <= ringPointsCount; j++) {
        const angle = (j / ringPointsCount) * Math.PI * 2;
        const ringX = offsetX + Math.cos(angle) * currentRadius;
        const ringZ = z + Math.sin(angle) * currentRadius;
        ringPoints.push(new THREE.Vector3(ringX, currentY, ringZ));
      }

      const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringLine = new THREE.Line(ringGeometry, netMaterial);
      this.add(ringLine);
    }
  }

  /**
   * Draws the inner rectangle on the backboard used as a shooting guide.
   *
   * @param {number} direction - Direction multiplier (1 or -1) determining which face of the backboard is rendered.
   * @private
   */
  addBackboardRectangle(direction) {
    const rectMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });

    const rectWidth = 2.2;
    const rectHeight = 1.4;

    const faceX = direction * 0.11;

    const bottomY = 9.1;
    const topY = bottomY + rectHeight;

    const leftZ = -rectWidth / 2;
    const rightZ = rectWidth / 2;

    const rectPoints = [
      new THREE.Vector3(faceX, bottomY, leftZ),
      new THREE.Vector3(faceX, topY, leftZ),
      new THREE.Vector3(faceX, topY, rightZ),
      new THREE.Vector3(faceX, bottomY, rightZ),
      new THREE.Vector3(faceX, bottomY, leftZ),
    ];

    const rectGeometry = new THREE.BufferGeometry().setFromPoints(rectPoints);
    const rectLine = new THREE.Line(rectGeometry, rectMaterial);
    this.add(rectLine);
  }
}
