export interface NavigationMenu {
    name: string,
    redirectUrl?: string,
    children?: NavigationMenu[];
}

export const navigationMenus: NavigationMenu[] = [
    {
        name: 'Games',
        children: [

            {
                name: 'Upcoming Games',
                redirectUrl: '/games'
            },
            {
                name: 'Retro Collection',
                redirectUrl: '/games'
            },
            {
                name: 'Top Rated Games',
                redirectUrl: '/games'
            },
            {
                name: '<b>Browse all games  →</b>',
                redirectUrl: '/games'
            },
        ]
    },
    {
        name: 'Platforms',
        redirectUrl: '/platforms',
        children: [
            {
                name: 'PC',
                redirectUrl: '/games?platforms=4'
            },
            {
                name: 'Playstation 5',
                redirectUrl: '/games?platforms=187'
            },

            {
                name: 'PlayStation 4',
                redirectUrl: '/games?platforms=18'
            },
            {
                name: 'Xbox One',
                redirectUrl: '/games?platforms=1'
            },
            {
                name: 'Xbox Series S/X',
                redirectUrl: '/games?platforms=186'
            },
            {
                name: 'Nintendo Switch',
                redirectUrl: '/games?platforms=7'
            },
            {
                name: '<b>Browse all platforms  →</b>',
                redirectUrl: '/platforms'
            },
        ]
    },
    {
        name: 'Genres',
        redirectUrl: '/genres',
        children: [
            {
                name: 'Action',
                redirectUrl: '/games?genres=action'
            },
            {
                name: 'Indie',
                redirectUrl: '/games?genres=indie'
            },

            {
                name: 'Adventure',
                redirectUrl: '/games?genres=adventure'
            },
            {
                name: 'RPG',
                redirectUrl: '/games?genres=role-playing-games-rpg'
            },
            {
                name: 'Strategy',
                redirectUrl: '/games?genres=strategy'
            },
            {
                name: 'Platformer',
                redirectUrl: '/games?genres=platformer'
            },
            {
                name: '<b>Browse all genres  →</b>',
                redirectUrl: '/genres'
            },
        ]
    },
    {
        name: 'Publishers',
        redirectUrl: '/publishers'
    },
    {
        name: 'Developers',
        redirectUrl: '/developers'
    },

];
