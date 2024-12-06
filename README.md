# be-eventing (🏇) [WIP]

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