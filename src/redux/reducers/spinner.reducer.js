export const spinnerReducer = (state = false, { type, payload }) => {
    switch (type) {

        case 'TOGGLE_SPINNER':
            return !state;

        default:
            return state;
    }
};
