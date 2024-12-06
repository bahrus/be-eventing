# be-eventing (🏇)

```html
<button>My Button</button>
<script be-eventing>document.currentScript.on={
    click: e => console.log({e})}</script>
```

or

```html
<button>My Button</button>
<script 🏇>document.currentScript.on={
    click: e => console.log({e})
}</script>

```

Either one attaches the click event handler to the previous element sibling (button in this case) by default.

## nudging

*be-eventing* can also "nudge" the previous element (by default), removing "disabled" and "defer-[enhancementBase]"

## Viewing Locally

Any web server that serves static files will do but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Install Python 3 or later.
5.  Open command window to folder where you cloned this repo.
6.  > npm install
7.  > npm run serve
8.  Open http://localhost:8000/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-elevating/be-elevating.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-elevating';
</script>
```

