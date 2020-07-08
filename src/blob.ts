import { circle } from './canvas'
import Vector from './vector'

interface Blob {
	_ctx: CanvasRenderingContext2D
	_vector: Vector
	_radius: number
	color: string
}

class Blob {
	constructor(_ctx: CanvasRenderingContext2D, _vector: Vector, _radius: number) {
		const getRandomColor = (): string => {
			const letters = '0123456789ABCDEF'
			let color = '#'
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)]
			}
			return color
		}

		this._ctx = _ctx
		this._vector = _vector
		this._radius = _radius
		this.color = getRandomColor()
	}

	public show(): void {
		this._ctx.fillStyle = this.color
		circle(this._ctx, this._vector.position, this._radius)
	}

	public get vector(): Vector {
		return this._vector
	}
}

export default Blob
