interface Planet {
    name: string;
    radius: number;
    color: number;
    positionX: number;
}

export const planets: Planet[] = [
    {
        name: 'Mercury',
        radius: 0.38,
        color: 0xdf8b8b,
        positionX: 0
    },
    {
        name: 'Venus',
        radius: 0.95,
        color: 0xddabf7,
        positionX: 2.5
    },
    {
        name: 'Earth',
        radius: 1,
        color: 0x9ec7e0,
        positionX: 6
    }
];