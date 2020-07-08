import { circle } from './canvas'
import Vector from './vector'

class Blob implements Blob {
	constructor(private _ctx: CanvasRenderingContext2D, private _vector: Vector, private _radius: number) {}

	public show(): void {
		this._ctx.fillStyle = 'white'
		circle(this._ctx, this._vector.position, this._radius)
	}

	public get vector(): Vector {
		return this._vector
	}
}

export default Blob
