import Blob from './blob'
import Vector from './vector'
import Mouse from './mouse'
import MassBlob from './massBlob'
import Game from './game'

const MASS_RADIUS = 20

class UserBlob extends Blob {
	private mouse: Mouse
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string) {
		super(_ctx, _vector, _radius, _color)
		this.mouse = new Mouse()
	}

	public canEatBlob(blob: Blob): boolean {
		return blob.canBeEaten && this._vector.dist(blob._vector.position) < this._radius + blob._radius
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
		const area = Math.PI * this._radius ** 2
		const newArea = Math.PI * n ** 2 + area
		const radius = Math.sqrt(newArea / Math.PI)
		this._radius = radius
	}

	public spewMass(game: Game): void {
		if (this._radius > 30) {
			const direction = this.mouse
				.getPosition()
				.subtract({ x: innerWidth / 2, y: innerHeight / 2 })
				.normalise()

			const area = Math.PI * this._radius ** 2

			const newArea = area - Math.PI * MASS_RADIUS ** 2
			const radius = Math.sqrt(newArea / Math.PI)
			this._radius = radius
			game.addBlob(new MassBlob(this._ctx, new Vector(this._vector.position.x, this._vector.position.y), MASS_RADIUS, this._color, direction))
		}
	}
}

export default UserBlob
