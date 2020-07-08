import Blob from './blob'
import UserBlob from './userBlob'
import Vector from './vector'

interface Game {
	ctx: CanvasRenderingContext2D
	blobs: Blob[]
	user: UserBlob
	frame: number
}

class Game {
	constructor() {
		this.frame = 0
		this.ctx = Game.init()
		this.user = new UserBlob(this.ctx, new Vector(innerWidth / 2, innerHeight / 2), 20)
		this.blobs = []
		this.startDrawLoop()
	}

	private startDrawLoop(): void {
		const drawLoop = (): void => {
			this.frame++
			if (this.frame % 60 === 0) {
				const x = Math.random() * innerWidth * 2 - innerWidth
				const y = Math.random() * innerHeight * 2 - innerHeight

				this.addBlob(new Blob(this.ctx, new Vector(x, y), 10))
			}
			this.ctx.save()
			this.ctx.setTransform(1, 0, 0, 1, 0, 0)
			this.ctx.clearRect(0, 0, innerWidth, innerHeight)
			this.ctx.restore()
			this.draw()
			requestAnimationFrame(drawLoop)
		}
		drawLoop()
	}

	private draw(): void {
		this.ctx.fillStyle = '#000000'
		const t = this.ctx.getTransform()
		// this.ctx.fillRect(-t.e, -t.f, innerWidth, innerHeight)
		this.user.moveToCursor()
		this.user.show()

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
}

export default Game
