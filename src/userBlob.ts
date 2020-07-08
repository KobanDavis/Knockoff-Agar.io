import Blob from './blob'
import Vector from './vector'
import Mouse from './mouse'
import MassBlob from './massBlob'
import Game from './game'

const MASS_RADIUS = 30

class UserBlob extends Blob {
	private mouse: Mouse
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string) {
		super(_ctx, _vector, _radius, _color)
		this.mouse = new Mouse()
	}

	public canEatBlob(blob: Blob): boolean {
		return blob.canBeEaten && this._radius > blob._radius + 5 && this._vector.dist(blob._vector.position) < this._radius + blob._radius / 2
	}

	public moveToCursor(): void {
		const direction = this.mouse
			.getPosition()
			.subtract({ x: innerWidth / 2, y: innerHeight / 2 })
			.normalise()
			.scale(7 / (Math.PI * this._radius ** 2) ** (1 / 10))
		this._ctx.translate(-direction.position.x, -direction.position.y)
		this._vector.add(direction.position)
	}

	public addMass(n: number): void {
		const area = Math.PI * this._radius ** 2
		const newArea = Math.PI * n ** 2 + area
		const radius = Math.sqrt(newArea / Math.PI)
		const radiusDiff = radius - this._radius
		let i = 30
		const interval = setInterval(() => {
			if (i === 0) clearInterval(interval)
			this._radius += radiusDiff / 30
			i--
		})
	}

	public spewMass(game: Game): void {
		const area = Math.PI * this._radius ** 2
		const newArea = area - Math.PI * MASS_RADIUS ** 2
		const radius = Math.sqrt(newArea / Math.PI)
		if (radius > MASS_RADIUS) {
			const direction = this.mouse
				.getPosition()
				.subtract({ x: innerWidth / 2, y: innerHeight / 2 })
				.normalise()
			const radiusDiff = radius - this._radius
			let i = 30
			const interval = setInterval(() => {
				if (i === 0) clearInterval(interval)
				this._radius += radiusDiff / 30
				i--
			})

			game.addBlob(new MassBlob(this._ctx, new Vector(this._vector.position.x, this._vector.position.y), MASS_RADIUS, this._color, direction))
		}
	}
}

export default UserBlob
