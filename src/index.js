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
import FDropdown from './FDropdown';
import FModal from './FModal';
import { useFModal } from './FModal/useFModal';
import { useFModalDialog } from './FModal/useFModalDialog';
import FMLayoutDefault from './FModal/layouts/FMLayoutDefault';
import FMLayoutForm from './FModal/layouts/FMLayoutForm';
import FMLayoutDialog from './FModal/layouts/FMLayoutDialog';
import FTooltip from './FTooltip';
import { vTooltip } from './FTooltip/directive';
import FTextarea from './forms/FTextarea';
import FGenericForm from './forms/FGenericForm';
import FTabsContainer from './FTabs/FTabsContainer';
import FTab from './FTabs/FTab';
import FFormRow from './forms/FFormRow';


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
	FTextarea,
	FDropdown,
	FModal,
	useFModal,
	useFModalDialog,
	FMLayoutDefault,
	FMLayoutForm,
	FMLayoutDialog,
	FTooltip,
	vTooltip,
	FGenericForm,
	FTabsContainer,
	FTab,
	FFormRow,
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
	FTextarea,
	FDropdown,
	FModal,
	FMLayoutDefault,
	FMLayoutForm,
	FMLayoutDialog,
	FTooltip,
	FGenericForm,
	FTabsContainer,
	FTab,
	FFormRow,
};

export const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
	app.directive('tooltip', vTooltip);
};
