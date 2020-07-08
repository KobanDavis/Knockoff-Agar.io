import { Position } from './types'

class Vector {
	constructor(private _x: number, private _y: number) {}

	public get position(): Position {
		return { x: this._x, y: this._y }
	}

	public normalise(): Vector {
		const hypotenuse = Math.sqrt(this._x ** 2 + this._y ** 2)
		this._x = this._x / hypotenuse || 0
		this._y = this._y / hypotenuse || 0
		return this
	}

	public sub(v: Position): Vector {
		this._x -= v.x
		this._y -= v.y
		return this
	}

	public add(v: Position): Vector {
		this._x += v.x
		this._y += v.y
		return this
	}
}

export default Vector
