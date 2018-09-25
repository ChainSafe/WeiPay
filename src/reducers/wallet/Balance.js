import {
    FETCHING_COIN_DATA,
    FETCHING_COIN_DATA_SUCCESS,
    FETCHING_COIN_DATA_FAIL,
    FETCHING_ETH_PRICE_DATA,
    FETCHING_ETH_PRICE_DATA_SUCCESS,
    FETCHING_ETH_PRICE_DATA_FAIL,
} from '../../actions/ActionTypes';

/**
 * 0 index of price array represents the 1-1 ETH price -> the other currencies are relative to ETH
 */
const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
    //currentPriceArray: {},
    currentPriceArray: [
        { 'USD': [1] },
        { 'CAD': [2] },
        { 'EUR': [3] },
        { 'ETH': [4] },
        { 'BTC': [5] },
    ],
    currencyVariation: 5,
};

export default function(state = initialState, action) {
    
    switch(action.type) {
        case FETCHING_COIN_DATA: 
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_SUCCESS: 
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_FAIL: 
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        case FETCHING_ETH_PRICE_DATA: 
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });
        case FETCHING_ETH_PRICE_DATA_SUCCESS: 
        console.log("before for");
        
            for(let i = 0; i < state.currencyVariation; i++) {
                let key = Object.keys(state.currentPriceArray[i]);
                console.log(state.currentPriceArray[i][key]);
                
                console.log("Key", key);
                //console.log(state.currentPriceArray[i].key);
                       
                        
            }

            // let priceData = action.payload;
            //console.log(priceData);
            return { ...state, currentPriceArray: action.pa };
        case FETCHING_ETH_PRICE_DATA_FAIL: 
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err
            });

            
        default: 
            return state;
    }

}