import { Position } from './types'

class Vector {
	constructor(private _x: number, private _y: number) {}

	public get position(): Position {
		return { x: this._x, y: this._y }
	}

	public normalise(): Vector {
		const hypotenuse = Vector.getHypotenuse(this.position)
		this._x = this._x / hypotenuse || 0
		this._y = this._y / hypotenuse || 0
		return this
	}

	public subtract(v: Position): Vector {
		this._x -= v.x
		this._y -= v.y
		return this
	}

	public add(v: Position): Vector {
		this._x += v.x
		this._y += v.y
		return this
	}

	public scale(s: number): Vector {
		this._x *= s
		this._y *= s
		return this
	}

	public dist(v: Position): number {
		const x = this._x - v.x
		const y = this._y - v.y
		return Vector.getHypotenuse({ x, y })
	}

	public static getHypotenuse(v: Position): number {
		return Math.sqrt(v.x ** 2 + v.y ** 2)
	}
}

export default Vector
