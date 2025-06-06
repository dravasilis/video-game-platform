export interface Category {
    title: string,
    subTitle: string,
    img: string,
    redirectTo: string;
}
export const Categories: Category[] = [
    {
        title: 'Browse Games',
        subTitle: 'Over 800K Games',
        img: '/images/bg5.png',
        redirectTo: 'games'
    },
    {
        title: 'Browse Genres',
        subTitle: '19 Genres',
        img: '/images/bg3.jpg',
        redirectTo: 'genres'
    },
    {
        title: 'Browse Publishers',
        subTitle: 'Over 81K Publishers',
        img: '/images/bg1.jpg',
        redirectTo: 'publishers'
    },
    {
        title: 'Browse Developers',
        subTitle: 'Over 445K Developers',
        img: '/images/bg20.jpg',
        redirectTo: 'developers'
    },
    {
        title: 'Browse Platforms',
        subTitle: 'Over 50 Platforms',
        img: '/images/consoles.jpg',
        redirectTo: 'platforms'
    },



];
