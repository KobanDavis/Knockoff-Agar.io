import Blob from './blob'
import Vector from './vector'

interface MassBlob {
	_direction: Vector
	_velocity: number
}

class MassBlob extends Blob {
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string, _direction: Vector, _velocity: number) {
		super(_ctx, _vector, _radius, _color)
		this._direction = _direction
		this.canBeEaten = false
		this._velocity = _velocity * 5
		this.init()
	}

	private init(): void {
		const interval = (): void => {
			if (this._velocity < 0.5 /* magic */) {
				this.canBeEaten = true
				return
			}
			console.log(this._direction, this._velocity)
			this.vector.add(new Vector(this._direction.position.x, this._direction.position.y).scale(this._velocity).position)
			this._velocity *= 0.9 // lovely magic number :)
			requestAnimationFrame(interval)
		}
		interval()
	}
}

export default MassBlob
