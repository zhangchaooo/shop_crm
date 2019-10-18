import partner from "@/services/partner";


export default {
    namespace: "partner",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: {},
        groupInfo: {},
        setSend: {},
        setpartnerExpires: {},
        changePrice: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(partner.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * businessList({ payload, callback }, { call, put }) {
            const response = yield call(partner.businessList, payload);
            yield put({
                type: "_businessList",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(partner.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        // * groupInfo({ payload, callback }, { call, put }) {
        //     const response = yield call(partner.groupInfo, payload);
        //     yield put({
        //         type: "_groupInfo",
        //         payload: response
        //     });
        //     if (callback) callback(response);
        // },
        * setSend({ payload, callback }, { call, put }) {
            const response = yield call(partner.setSend, payload);
            yield put({
                type: "_setSend",
                payload: response
            });
            if (callback) callback(response);
        },
        * setpartnerExpires({ payload, callback }, { call, put }) {
            const response = yield call(partner.setpartnerExpires, payload);
            yield put({
                type: "_setpartnerExpires",
                payload: response
            });
            if (callback) callback(response);
        },
        * changePrice({ payload, callback }, { call, put }) {
            const response = yield call(partner.changePrice, payload);
            yield put({
                type: "_changePrice",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _businessList(state, action) {
            return {
                ...state,
                businessList: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _groupInfo(state, action) {
            return {
                ...state,
                groupInfo: action.payload
            };
        },
        _setSend(state, action) {
            return {
                ...state,
                setSend: action.payload
            };
        },
        _setpartnerExpires(state, action) {
            return {
                ...state,
                setpartnerExpires: action.payload
            };
        },
        _changePrice(state, action) {
            return {
                ...state,
                changePrice: action.payload
            };
        }
    }
};
