import colors from 'material-ui/lib/styles/colors';

const colorList = [
    colors.red400,
    colors.yellow400,
    colors.green400,
    colors.deepOrange400,
    colors.blueGrey400,
    colors.teal400
];
const colorMap = {};

export const getColor = (id) => (
    id ? colorMap[id] || (colorMap[id] = colorList[Object.keys(colorMap).length % colorList.length])
        : colors.grey400
)
