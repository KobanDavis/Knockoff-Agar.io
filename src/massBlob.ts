import Blob from './blob'
import Vector from './vector'

interface MassBlob {
	_direction: Vector
	velocity: number
}

class MassBlob extends Blob {
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string, _direction: Vector) {
		super(_ctx, _vector, _radius, _color)
		this._direction = _direction
		this.canBeEaten = false
		this.init()
		this.velocity = 1.2 // magic
	}

	private init(): void {
		const interval = setInterval(() => {
			if (this.velocity < 0.7 /* magic */) {
				this.canBeEaten = true
				clearInterval(interval)
			}
			this.vector.add(this._direction.scale(this.velocity).position)
			this.velocity *= 0.994 // lovely magic number :)
		})
	}
}

export default MassBlob
