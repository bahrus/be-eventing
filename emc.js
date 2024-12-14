// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP, AllProps, AP, BAP} from './ts-refs/be-eventing/types' */;

/**
 * @type {EMC<any, BAP>}
 */
export const emc = {
    base: 'be-eventing',
    branches: ['', 'on', 'nudge'],
    map: {
        '0.0': {
            instanceOf: 'String',
            mapsTo: 'onNudges'
        },
        '1.0': {
            instanceOf: 'String',
            mapsTo: 'on'
        },
        '2.0': {
            instanceOf: 'String',
            mapsTo: 'nudges'
        }
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
