import Blob from './blob'
import UserBlob from './userBlob'
import Vector from './vector'
import InputHandler from './inputHandler'
import { lerp } from './helper'

interface Game {
	ctx: CanvasRenderingContext2D
	blobs: Blob[]
	user: UserBlob
	frame: number
	zoom: number
}

const generateColor = (amount: number = 120): string => {
	const hue = Math.trunc((360 / amount) * (Math.random() * amount))
	return `hsl(${hue}, 100%, 50%)`
}

class Game {
	constructor() {
		this.zoom = 1
		this.blobs = []
		this.frame = 0
		this.ctx = Game.init()
		this.user = new UserBlob(this.ctx, new Vector({ x: 0, y: 0 }), 20, generateColor())
		// eslint-disable-next-line
		new InputHandler(this, this.user)
	}

	public startDrawLoop(): void {
		const blobs: Blob[] = []

		this.generateFood(100)

		blobs.forEach((blob) => this.addBlob(blob))

		const drawLoop = (): void => {
			this.draw()
			requestAnimationFrame(drawLoop)
		}
		drawLoop()
	}

	private draw(): void {
		// Reset canvas
		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
		this.ctx.clearRect(0, 0, innerWidth, innerHeight)

		this.user.moveToCursor()

		// Set scale
		this.ctx.translate(innerWidth / 2, innerHeight / 2)
		const newZoom = 10 / Math.sqrt(this.user._radius)
		this.zoom = lerp(this.zoom, newZoom, 0.1)
		this.ctx.scale(this.zoom, this.zoom)
		this.ctx.translate(-this.user._vector.position.x, -this.user._vector.position.y)

		this.user.show()

		this.frame++
		if (this.frame % 60 === 0) this.generateFood(1)

		for (let i = this.blobs.length - 1; i > 0; i--) {
			const blob = this.blobs[i]
			blob.show()
			if (this.user.canEatBlob(blob)) {
				this.blobs.splice(i, 1)
				this.user.addMass(blob._radius)
			}
		}
	}

	private static init(): CanvasRenderingContext2D {
		const canvas = document.createElement('canvas')
		canvas.setAttribute('width', `${innerWidth}px`)
		canvas.setAttribute('height', `${innerHeight}px`)
		document.body.appendChild(canvas)
		return canvas.getContext('2d')
	}

	public addBlob(blob: Blob): void {
		this.blobs.push(blob)
	}

	public generateFood(n: number): void {
		for (let i = 0; i < n; i++) {
			const x = Math.random() * innerWidth * 2 - innerWidth
			const y = Math.random() * innerHeight * 2 - innerHeight
			this.addBlob(new Blob(this.ctx, new Vector({ x, y }), Math.random() * 5 + 10, generateColor()))
		}
	}
}

export default Game
