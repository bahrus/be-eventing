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

```html
<ways-of-science itemscope>
    <carrot-nosed-woman></carrot-nosed-woman>
    <a-duck></a-duck>
    <template
        defer-be-switched
        be-switched='On based on ~carrotNosedWoman::weight-change and ~aDuck::molting.'
    >
        <div>A witch!</div>
        <div>Burn her!</div>
    </template>
    <script be-eventing=be-switched>document.currentScript.on={
        change: e => e.r = Math.abs(e.f.carrotNosedWoman - e.f.aDuck) < 10
    }</script>
</ways-of-science>
```

What this does, precisely [TODO]:

1.  Finds Mount Observer Script Element (MOSE) with id:  "be-hive.be-switched" within the shadow realm
2.  Gets the enhKey
3.  Filters out events that don't match the enhKey
4.  Attaches the enhanced event listener to the previous non script element sibling.
5.  "Nudges" the def-be-switched


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

