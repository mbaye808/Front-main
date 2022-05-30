import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [

            {
                id       : 'home',
                title    : 'Home',
                type     : 'item',
                icon     : 'home',
                url      : '/home'
            },

            {
                id       : 'cours',
                title    : 'Bulletin',
                type     : 'item',
                icon     : 'ballot',
                url      : '/cours'
            },
 
            {
                id       : 'calendrier',
                title    : 'Emploi du temps',
                type     : 'item',
                icon     : 'calendar_today',
                url      : '/calendrier'
            },
            {
                id       : 'order',
                title    : 'Order',
                type     : 'item',
                icon     : 'folder',
                url      : '/order'
            },
         
        ]
    }
];
