// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP} from './ts-refs/be-eventing/types' */;

/**
 * @implements {Actions}
 * 
 */
class BeEventing extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement, any>}
     */
    static config = {
        propDefaults:{},
        propInfo: {
            ...propInfo,
            on: {},
            nudges: {},
            onNudges: {},
        },
        positractions: [resolved, rejected],
        actions: {
            calcDefaults: {
                ifNotAllOf: ['on', 'nudges']
            },
            hydrate: {
                ifAllOf: ['on', 'nudges'],
                ifNoneOf: ['resolved']
            }
        }
    }

    de = de;

    /** @type {AbortController | undefined} */
    #ac;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async calcDefaults(self){
        const {on, onNudges, nudges, enhancedElement} = self;
        if(onNudges){
            return  /** @type {PAP} */ ({
                on: onNudges,
                nudges: onNudges
            })
        }
        return /** @type {PAP} */ ({
            on: on ?? (await import('trans-render/asmr/stdEvt.js')).stdEvt(enhancedElement),
            nudges: nudges ?? 'disabled'
        });
        
    }

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async hydrate(self){
        const {enhancedElement, nudges, on} = self;
        const {previousElementSibling} = enhancedElement;
        if(previousElementSibling === null) throw 404;
        let previousNonScriptElementSibling = previousElementSibling;
        while(previousNonScriptElementSibling.localName === 'script'){
            const test = previousNonScriptElementSibling.previousElementSibling;
            if(test === null) throw 404;
            previousNonScriptElementSibling = test;
        }
        this.#ac = new AbortController();
        const innerScript = enhancedElement.innerHTML;
        const guid = `a_${crypto.randomUUID()}`;
        const revisedScript = `document.currentScript['${guid}'] = e => {with(event.target){
${innerScript}
}}`;
        const scriptEl = document.createElement('script');
        scriptEl.innerHTML = revisedScript;
        document.head.appendChild(scriptEl);
        const eventHandler = /** @type ((e: Event) => void) */ (scriptEl[guid]);
        previousNonScriptElementSibling.addEventListener(on, eventHandler, {signal: this.#ac.signal});
        if((nudges === 'disabled' && !('disabled' in previousNonScriptElementSibling))){
            return /** @type {PAP} */ ({
                resolved: true,
            });
        }
        const {nudge} = await import('trans-render/lib/nudge.js');
        if(nudges === 'disabled'){
            nudge(previousNonScriptElementSibling);
        }else{
            nudge(previousNonScriptElementSibling, 'defer-' + nudges);
        }

        return /** @type {PAP} */ ({
            resolved: true,
        });
    }

    /**
     * 
     * @param {HTMLScriptElement} el 
     */
    async detach(el){
        this.#ac?.abort();
        await super.detach(el);
    }
}

await BeEventing.bootUp();
export { BeEventing };
