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
		this.velocity = 1.055 // magic
		this.init()
	}

	private init(): void {
		const interval = setInterval(() => {
			if (this.velocity < 0.9 /* magic */) {
				this.canBeEaten = true
				clearInterval(interval)
			}
			this.vector.add(this._direction.scale(this.velocity).position)
			this.velocity *= 0.9993 // lovely magic number :)
		})
	}
}

export default MassBlob
