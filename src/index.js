import FIcon from './FIcon';
import FLoader from './FLoader';
import FButton from './FButton';
import FButtonText from './FButtonText';
import FStack from './FStack';
import FSwitch from './forms/FSwitch';
import FCheckbox from './forms/FCheckbox';
import FInput from './forms/FInput';
import FInputAutocomplete from './forms/FInputAutocomplete';
import FSelect from './forms/FSelect';
import FRadioButton from './forms/FRadioButton';
import FControlLabel from './forms/FControlLabel';


export {
	FIcon,
	FLoader,
	FButton,
	FButtonText,
	FSwitch,
	FCheckbox,
	FInput,
	FInputAutocomplete,
	FRadioButton,
	FSelect,
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
	FInputAutocomplete,
	FRadioButton,
	FSelect,
	FStack,
	FControlLabel,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
