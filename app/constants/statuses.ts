export interface Status {
    [key: string]: {
        label: string;
        svg: string;
    };
}

export const statuses: Status = {
    owned: {
        label: 'Owned',
        svg: 'owned'
    },
    beaten: {
        label: 'Beaten',
        svg: 'beaten'
    },
    playing: {
        label: 'Playing',
        svg: 'playing'
    },
    toplay: {
        label: 'Backlogged',
        svg: 'backlogged'
    },
    yet: {
        label: 'Wishlist',
        svg: 'wishlist'
    },
    dropped: {
        label: 'Dropped',
        svg: 'dropped'
    }
};
