<h1 align="center" >Futility UI</h1>

<p align="center">
	<a href="https://www.npmjs.com/package/futility-ui" target="_blank" title="Version">
		<img src="https://img.shields.io/npm/v/futility-ui.svg" alt="Version">
	</a>
	<a href="https://raw.githubusercontent.com/dd/futility-ui/master/LICENSE" target="_blank" title="License - Mozilla Public License Version 2.0" >
		<img src="https://img.shields.io/npm/l/futility-ui?cache-cracker" alt="License - Mozilla Public License Version 2.0" />
	</a>
</p>


A set of ready-to-use UI components for Vue 3, styled according to the [Flowbite](https://flowbite.com/) design system, providing a fast start and a consistent visual style for your application.

[Live Demo](https://dd.github.io/futility-ui/)


## Installation

First, install the package:

```sh
pnpm add futility-ui
```


## Usage

WIP


## Development

### Setting Up for Development

Clone the repository and install dependencies:

```console
git clone git@github.com:dd/futility-ui.git
cd futility-ui
pnpm install
```


### Running in Development Mode

Use Vite to start a local development server:

```console
pnpm run storybook
```


### Building the Library

To create a production-ready build:

```console
pnpm run build
```


### Contributing

1. Fork the repository on GitHub.

2. Create a new branch for your feature or fix.

3. Make your changes and commit them with clear messages.

4. Open a pull request and describe your changes.

We welcome contributions of all sizes!


### Roadmap

* [x] Icons
* [x] Loader
* [x] Buttons
* [x] Text button
* [x] Switch
* [x] Checkbox
* [x] Input
* [ ] Widgets group (A component that visually merges widgets without spacing, such as an input field immediately followed by a button.)
* [ ] Radio button
* [ ] Form row (A component that renders a form row with a label, widget, help text, and error text.) **`<- you are here`**
* [ ] Select
* [ ] DropDown
* [ ] FileSelect
* [ ] FileSelectArea
* [ ] Textarea
* [ ] Number picker
* [ ] Modal
* [ ] Tree Editor
* [ ] MultiSelect
* [ ] Tag Select
* [ ] Tabs
* [ ] DatePicker
* [ ] TimePicker
* [ ] Paginator
* etc.

#### Refactor

* [ ] Move some of button themes styles to theme
* [ ] Update button focus styles

#### Extended

* [ ] Tag panel
* [ ] Input Autocomplete (with loading options)
* [ ] Select Autocomplete
* [ ] Multi Select Autocomplete
* [ ] Select with custom dropdown (search, loading, etc...)

#### Dev

* [x] Storybook at github pages
* [x] Deploy to npm
* [ ] Web interface for customize styles


## Oh great, another UI library.

You might be wondering: why the heck do we need yet another UI library? The short answer is: just because.

This library isn\`t necessarily better than others. It has a much smaller community, it evolves more slowly, and it doesn\`t really have any unique killer feature. It exists simply because none of the existing options fully work for me. Either there aren\`t enough components, or they\`re incredibly complicated, or not truly native to Vue, or they\`re paid, or… they just look ugly. So, I decided to build my own.

This library grew out of components I use at work. And my colleagues are probably asking themselves: why bother extracting the UI into a separate repo? Here are a few reasons:

* I don\`t like monorepos.

* It\`s easier to isolate components, code style, and dependencies.

* Components are simpler to organize and structure.

* Writing documentation is easier when you build components outside the context of the main project.

* A separate repo makes it simpler to set up tests, build processes, and all that stuff. (Yeah, yeah - I know there are no tests yet, but eventually I\`ll add some, at least out of curiosity.)

* You can improve the UI independently from the main project.

* It helps keep the main project\`s codebase cleaner - less clutter unrelated to business logic.

* Reusability? That\`s a cliche argument, and it\`s not really the main goal here (But who knows - maybe I\`ll use this library in other projects too. I already have a few ideas).

* An attempt to turn legacy code into a documented library that anyone can use.
