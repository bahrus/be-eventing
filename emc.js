// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'be-eventing',
    map: {

    },
    enhPropKey: 'beEventing',
    importEnh: async () => {
        const { BeEventing } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-eventing.js'));
        return BeEventing;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
