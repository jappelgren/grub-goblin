export default (state = [], { type, payload }) => {
    //stores all assigned recipes
    switch (type) {
        case 'SET_WEEK':
            return payload;

        default:
            return state;
    }
};
