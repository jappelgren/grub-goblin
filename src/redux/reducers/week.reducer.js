export default (state = [], { type, payload }) => {
    switch (type) {

        case 'SET_WEEK':
            return payload;

        default:
            return state;
    }
};
