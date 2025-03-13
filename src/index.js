import FIcon from './components/FIcon';
import FLoader from './components/FLoader';


export {
	FIcon,
	FLoader,
};

export const version = __VERSION__;


const components = {
	FIcon,
	FLoader,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
