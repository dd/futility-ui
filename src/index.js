import FIcon from './components/FIcon';
import FLoader from './components/FLoader';
import FButton from './components/FButton';
import FButtonText from './components/FButtonText';
import FSwitch from './components/forms/FSwitch';
import FCheckbox from './components/forms/FCheckbox';
import FInput from './components/forms/FInput';
import FRadioButton from './components/forms/FRadioButton';
import FStack from './components/FStack';


export {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
	FSwitch,
	FCheckbox,
	FInput,
	FRadioButton,
	FStack,
};

export const version = __VERSION__;


const components = {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
	FSwitch,
	FCheckbox,
	FInput,
	FRadioButton,
	FStack,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
