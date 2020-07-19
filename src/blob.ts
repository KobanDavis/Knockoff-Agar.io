import { circle } from './canvas'
import Vector from './vector'
import { lerp } from './helper'

interface Blob {
	_ctx: CanvasRenderingContext2D
	_vector: Vector
	_radius: number
	_color: string
	visibleRadius: number
	canBeEaten: boolean
}

class Blob {
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number, _color: string) {
		this._ctx = _ctx
		this._vector = _vector
		this._radius = _radius
		this._color = _color
		this.visibleRadius = _radius
		this.canBeEaten = true
	}

	public show(): void {
		this.visibleRadius = lerp(this.visibleRadius, this._radius, 0.2)
		this._ctx.fillStyle = this._color
		circle(this._ctx, this._vector.position, this.visibleRadius)
	}

	public get vector(): Vector {
		return this._vector
	}
}

export default Blob
