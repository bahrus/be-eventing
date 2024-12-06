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
        },
        positractions: [resolved, rejected],
    }

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    getOn(self){
        const {enhancedElement} = self;
        const {on, previousElementSibling} = enhancedElement;
        if(previousElementSibling === null) throw 404;
        //TODO: abort controller
        for(const eventName in on){
            const handler = on[eventName];
            previousElementSibling.addEventListener(eventName, handler);
        }
        return /** @type {PAP} */ ({
            resolved: true,
        });
    }
}

await BeEventing.bootUp();
export { BeEventing };
