import { circle } from './canvas'
import Vector from './vector'

interface Blob {
	_ctx: CanvasRenderingContext2D
	_vector: Vector
	_radius: number
	_color: string
	canBeEaten: boolean
}

class Blob {
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string) {
		this._ctx = _ctx
		this._vector = _vector
		this._radius = _radius
		this._color = _color
		this.canBeEaten = true
	}

	public show(): void {
		this._ctx.fillStyle = this._color
		circle(this._ctx, this._vector.position, this._radius)
	}

	public get vector(): Vector {
		return this._vector
	}
}

export default Blob
