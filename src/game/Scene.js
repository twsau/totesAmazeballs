import { World } from 'matter-js';

const Scene = {
	add: (app, object) => {
		if (object.body) {
			World.add(app.engine.world, object.body);
		}
		if (object.sprite) {
			app.camera.addChild(object.sprite);
		}
		app.objects.push(object);
	},
	remove: (app, object) => {
		if (object.body) {
			World.remove(app.engine.world, object.body, true);
		}
		if (object.sprite) {
			app.camera.removeChild(object.sprite);
		}
		const index = app.objects.indexOf(object);
		app.objects.splice(index, 1);
	},
	clear: app => {
		World.clear(app.engine.world, false);
		while(app.camera.children[0]) { 
        app.camera.removeChild(app.camera.children[0]);
    }
	}
}

export default Scene;