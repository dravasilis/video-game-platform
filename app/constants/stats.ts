interface Stat {
    svg: string,
    title: string,
    count?: string;
}
export const Stats: Stat[] = [
    {
        svg: 'game',
        title: 'Games',
        count: '813K'
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
export const GamePageStats: Stat[] = [
    {
        svg: 'lists',
        title: 'Lists',
    },
    {
        svg: 'star',
        title: 'Reviews',
    },
    {
        svg: 'suggestions',
        title: 'Suggestions',
    },
    {
        svg: 'achievements',
        title: 'Achievements',
    },
    {
        svg: 'time',
        title: 'Playtime',
    },
];
