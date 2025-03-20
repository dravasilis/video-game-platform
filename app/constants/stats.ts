interface Stat {
    svg: string,
    title: string,
    count?: string;
}
export const Stats: Stat[] = [
    {
        svg: 'game',
        title: 'Games',
    },
    {
        svg: 'star',
        title: 'Reviews',
        count: '500K'
    },
    {
        svg: 'rating',
        title: 'Ratings',
        count: '1.1M'
    },
];
