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
        propDefaults:{
            nudges: 'disabled'
        },
        propInfo: {
            ...propInfo,
        },
        positractions: [resolved, rejected],
        actions: {
            getOn: {
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
    async getOn(self){
        const {enhancedElement, nudges} = self;
        const {on, previousElementSibling, e} = enhancedElement;
        if(previousElementSibling === null) throw 404;
        let previousNonScriptElementSibling = previousElementSibling;
        while(previousNonScriptElementSibling.localName === 'script'){
            const test = previousNonScriptElementSibling.previousElementSibling;
            if(test === null) throw 404;
            previousNonScriptElementSibling = test;
        }
        this.#ac = new AbortController();
        if(on !== undefined){
            for(const eventName in on){
                const handler = on[eventName];
                previousNonScriptElementSibling.addEventListener(eventName, handler, {signal: this.#ac.signal});
            }
        }
        if(e !== undefined && nudges !== undefined){
            previousElementSibling.addEventListener(nudges, e, {signal: this.#ac.signal});
        }

        if(nudges !== undefined){
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
