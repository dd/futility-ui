import FIcon from './components/FIcon';


export {
	FIcon,
};

export const version = __VERSION__;


const components = {
	FIcon,
};

const install = (app) => {
	Object.keys(components).forEach((key) => {
		app.component(key, components[key]);
	});
};
export default { install };
