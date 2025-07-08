import FIcon from './components/FIcon';
import FLoader from './components/FLoader';
import FButton from './components/FButton';
import FButtonText from './components/FButtonText';
import FStack from './components/FStack';
import FSwitch from './components/forms/FSwitch';
import FCheckbox from './components/forms/FCheckbox';
import FInput from './components/forms/FInput';
import FRadioButton from './components/forms/FRadioButton';
import FControlLabel from './components/forms/FControlLabel';


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
	FControlLabel,
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
	FControlLabel,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
