import Blob from './blob'
import Vector from './vector'
import Mouse from './mouse'

class UserBlob extends Blob {
	private mouse: Mouse
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number) {
		super(_ctx, _vector, _radius)
		this.mouse = new Mouse()
	}

	public canEatBlob(blob: Blob): boolean {
		return this._vector.dist(blob._vector.position) < this._radius + blob._radius
	}

	public moveToCursor(): void {
		const direction = this.mouse
			.getPosition()
			.subtract({ x: innerWidth / 2, y: innerHeight / 2 })
			.normalise()
			.scale(3)
		this._ctx.translate(-direction.position.x, -direction.position.y)
		this._vector.add(direction.position)
	}

	public addMass(n: number): void {
		this._radius += n * 0.2
	}
}

export default UserBlob
