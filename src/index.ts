import './index.less'
import Blob from './blob'
import Vector from './vector'
import Mouse from './mouse'
import Game from './game'

const game = new Game()
const mouse = new Mouse()

const user = new Blob(game.ctx, new Vector(innerWidth / 2, innerHeight / 2), 20)
const blobs: Blob[] = [user]

for (let i = 0; i < 10; i++) {
	const x = Math.random() * innerWidth
	const y = Math.random() * innerHeight
	blobs.push(new Blob(game.ctx, new Vector(x, y), 10))
}

blobs.forEach((blob) => game.addBlob(blob))

// Move blob to mouse location at fixed rate
setInterval(() => {
	const direction = mouse
		.getPosition()
		.sub({ x: innerWidth / 2, y: innerHeight / 2 })
		.normalise()
	game.ctx.translate(-direction.position.x, -direction.position.y)
	user.vector.add(direction.position)
})
