import './index.less'
import Blob from './blob'

class Game {
	private ctx: CanvasRenderingContext2D
	private blobs: Blob[]
	constructor() {
		this.ctx = Game.init()
		this.startDrawLoop()
	}

	private startDrawLoop(): void {
		const drawLoop = (): void => {
			this.ctx.clearRect(0, 0, innerWidth, innerHeight)
			this.draw()
			requestAnimationFrame(drawLoop)
		}
		drawLoop()
	}

	private draw(): void {
		this.ctx.fillStyle = '#000000'
		this.ctx.fillRect(0, 0, innerWidth, innerHeight)
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

const game = new Game()
