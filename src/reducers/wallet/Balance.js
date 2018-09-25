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
    currentPriceStruct: [
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
        
            const oldPriceMatrix = state.currentPriceStruct;
            console.log("old matrix is ");
            console.log(oldPriceMatrix);
            

            for(let i = 0; i < state.currencyVariation; i++) {
                //let key = Object.keys(state.currentPriceArray[i]);
                let key = Object.keys(oldPriceMatrix[i]); 
                console.log(oldPriceMatrix[i][key]);    // value of the index of the array for each currency object
                console.log("paylod at key is ");
                console.log(action.payload[key]);      
                //console.log(oldPriceMatrix[key]);
                      
                //loop through api data and replace 0 index of all currencies with relative prices to eth
                oldPriceMatrix[i][key] = action.payload[key];                    
            }

            console.log("new matrix is");
            console.log(oldPriceMatrix);
            
            

            // let priceData = action.payload;
            //console.log(priceData);
            return { ...state };
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