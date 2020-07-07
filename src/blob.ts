import { circle } from './canvas'
import { Position } from './types'

class Blob implements Blob {
	constructor(private _ctx: CanvasRenderingContext2D, private _position: Position, private _radius: number) {}

	public show(): void {
		this._ctx.fillStyle = 'white'
		circle(this._ctx, this._position, this._radius)
	}
}

export default Blob
