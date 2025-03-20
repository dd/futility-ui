import FIcon from './components/FIcon';
import FLoader from './components/FLoader';
import FButton from './components/FButton';


export {
	FIcon,
	FLoader,
	FButton,
};

export const version = __VERSION__;


const components = {
	FIcon,
	FLoader,
	FButton,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
