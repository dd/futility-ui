import FIcon from './components/FIcon';
import FLoader from './components/FLoader';
import FButton from './components/FButton';
import FButtonText from './components/FButtonText';


export {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
};

export const version = __VERSION__;


const components = {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
