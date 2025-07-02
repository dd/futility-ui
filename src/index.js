import FIcon from './components/FIcon';
import FLoader from './components/FLoader';
import FButton from './components/FButton';
import FButtonText from './components/FButtonText';
import FSwitch from './components/forms/FSwitch';
import FCheckbox from './components/forms/FCheckbox';


export {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
	FSwitch,
	FCheckbox,
};

export const version = __VERSION__;


const components = {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
	FSwitch,
	FCheckbox,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
