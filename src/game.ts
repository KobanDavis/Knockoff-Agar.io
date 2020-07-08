import Blob from './blob'

class Game {
	ctx: CanvasRenderingContext2D
	private blobs: Blob[]
	constructor() {
		this.blobs = []
		this.ctx = Game.init()
		this.startDrawLoop()
	}

	private startDrawLoop(): void {
		const drawLoop = (): void => {
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
		this.ctx.fillRect(-t.e, -t.f, innerWidth, innerHeight)
		this.blobs.forEach((blob) => {
			blob.show()
		})
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
