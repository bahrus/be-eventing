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
        propInfo: {
            ...propInfo,
            nudges: {}
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
        const {on, previousElementSibling} = enhancedElement;
        if(previousElementSibling === null) throw 404;
        this.#ac = new AbortController();
        for(const eventName in on){
            const handler = on[eventName];
            previousElementSibling.addEventListener(eventName, handler, {signal: this.#ac.signal});
        }
        if(nudges !== undefined){
            const {nudge} = await import('trans-render/lib/nudge.js');
            const splitNudges = nudges.split(' ');
            nudge(previousElementSibling, splitNudges);
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
