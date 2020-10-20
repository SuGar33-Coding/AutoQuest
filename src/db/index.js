/* Fake database hit for yours truly */
const getGabe = async () => {
    return {
        name: 'gabe',
        level: 1,
        totalActions: 69,
        actionTime: 3
    };
};

module.exports = {
    getGabe
};