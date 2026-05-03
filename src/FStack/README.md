# FStack

A layout component for grouping related controls, such as buttons and inputs, into a single stack.


### Usage

Import the component:

```js
import { FStack } from 'futility-ui';
// or
import FStack from 'futility-ui/FStack';
```

Use it in your template:

```html
<FStack>
	<FButton>Generate</FButton>
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" >Revoke</FButton>
</FStack>
```

That's it!
