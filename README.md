# be-eventing (🏇)

Minimal CSP security rules stipulate that inline event handlers are "out of bounds" as far as guaranteeing safety.

This enhancement is designed to live within those (excessively?) tight constraints, and still be able to attach event handlers "locally" without requiring a framework or custom element host that has to micromanage everything -- leading to tight coupling.

Whereas attaching an event handler using a unique id may work outside the shadow DOM, it doesn't work very well with repeating content, especially inside Shadow Roots.  This, in my view, is driving a stake through progressive enhancement.

This enhancement endeavors to blunt the edge of that stake.

```html
<button disabled>My Button</button>
<script nomodule be-eventing-on=click>{
    console.log({e})
}</script>
```

or

```html
<button disabled>My Button</button>
<script 🏇-on=click>console.log({e})</script>
```

Either one attaches the click event handler to the previous element sibling (button in this case) by default.

If "disabled" is a property of the element being eventing, it nudges the attribute -- basically removing it.

## un-deferring [TODO]

*be-eventing* can also "nudge" "defer-[enhancementBase]" attributes:

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
    <script 🏇-nudge=be-switched 🏇-on=change>document.currentScript.on=
        e.r = Math.abs(e.f.carrotNosedWoman - e.f.aDuck) < 10;
    </script>
</ways-of-science>
```

What this does, precisely:

1.  Attaches the enhanced event listener to the previous non script element sibling.
2.  "Nudges" the defer-be-switched (eliminating it if there's no numeric value or it has value="1", otherwise decrements the number)

##  Occasional (?) short cut when the stars align [TODO]

A pattern seems to be emerging that some enhancements find it natural to raise an event with the same name as the enhancement itself:

```html
<div>
    <input id=searchString type=search>

    <div defer-🔭 🔭='#searchString and punt.'></div>
    <script 🏇=🔭>
        e.target.textContent = e.args[0] + ' World';
    <script>
</div>
```

This is equivalent to:

```html
<div>
    <input id=searchString type=search>

    <div defer-🔭 🔭='#searchString and punt.'></div>
    <script 🏇-on=🔭 🏇-nudge=🔭>
        e.target.textContent = e.args[0] + ' World';
    <script>
</div>
```

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
import 'be-eventing/be-eventing.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-eventing';
</script>
```

