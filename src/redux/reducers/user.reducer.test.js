import userReducer from './user.reducer.js';

describe('testing user reducer', () => {
    //SET_USER
    test('ACTION SET_USER', () => {
        const initialState = {};
        const action = { type: 'SET_USER', payload: { username: 'aef' } };

        expect(userReducer(initialState, action)).toEqual({ username: 'aef' });
    });


    //UNSET_USER
    test('ACTION UNSET_USER', () => {
        const initialState = { username: 'adf' };
        const action = { type: 'UNSET_USER' };

        expect(userReducer(initialState, action)).toEqual({});
    });


    //OTHER_ACTION
    test('ACTION OTHER', () => {
        const initialState = { username: 'adf' };
        const action = { type: 'BIG_CHUNGUS' };

        expect(userReducer(initialState, action)).toEqual(initialState);
    });

});