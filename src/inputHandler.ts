import Game from './game'
import UserBlob from './userBlob'

class InputHandler {
	constructor(private _game: Game, private _user: UserBlob) {
		this.init()
	}

	private init(): void {
		window.addEventListener('keyup', (e) => {
			switch (e.key.toLowerCase()) {
				case 'w':
					this._user.spewMass(this._game)

					break
				case 'space':
					break
				default:
					break
			}
		})
	}
}

export default InputHandler
