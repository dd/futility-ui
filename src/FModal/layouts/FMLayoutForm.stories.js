import FButton from '@/FButton';
import FInput from '@/forms/FInput';
import { SIZE_CHOICES } from '../constants';
import FMLayoutForm from './FMLayoutForm';
import FMLayoutDefault from './FMLayoutDefault.stories.js';


console.log(FMLayoutDefault)

export default {
	title: 'FModal/Layouts/FMLayoutForm',
	component: FMLayoutForm,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `Visually identical to \`FMLayoutDefault\`: it supports the same props and sizes.
Structurally, it differs: the root element is \`<form @submit.prevent>\`, and the title is rendered as \`<legend>\` instead of \`<h3>\`.
Use it when the modal content is a form with input fields and a submit button.`,
			},
		},
	},
	argTypes: {
		...FMLayoutDefault.argTypes,
		submit: {
			description: 'Native form `submit` event with `.prevent` applied. Handle it on the button or on the form itself.',
			table: { category: 'events' },
		},
	},
	args: {
		title: 'Create user',
		size: 'md',
		hideCloseButton: false,
		closeLabel: 'Close',
	},
};


export const Default = {
	render: (args) => ({
		components: { FMLayoutForm, FButton, FInput },
		setup() { return { args }; },
		template: `
			<FMLayoutForm v-bind="args" @close="args.close">
				<div style="display:flex;flex-direction:column;gap:12px;">
					<FInput placeholder="Name" />
					<FInput placeholder="Email" type="email" />
					<FInput placeholder="Role" />
				</div>
				<template #footer>
					<FButton design="outline">Cancel</FButton>
					<FButton type="submit">Save</FButton>
				</template>
			</FMLayoutForm>
		`,
	}),
};
