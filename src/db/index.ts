type error = {
    message: string
}


/* Fake database hit for yours truly */
export const getGabe: () => Promise<{
    name: string,
    level: number,
    totalActions: number,
    actionTime: number,
    error?: error
}> = async () => {
    return {
        name: 'gabe',
        level: 1,
        totalActions: 69,
        actionTime: 3
    };
};