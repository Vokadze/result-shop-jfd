import httpService from "./http.service";

const basketEndpoint = "basket/";

const basketService = {
    update: async (content) => {
        const { data } = await httpService.put(basketEndpoint, content);
        console.log(data);
        return data;
    },

    getBasket: async (_id, content) => {
        const { data } = await httpService.patch(basketEndpoint, {
            _id,
            ...content
        });
        console.log(data);
        return data;
    },

    fetchAll: async () => {
        const { data } = await httpService.get(basketEndpoint);
        console.log(data);
        return data;
    },
    create: async (_id, content) => {
        const { data } = await httpService.post(basketEndpoint, {
            _id,
            countPay: 0,
            ...content
        });
        console.log(data);
        return data;
    },
    incCount: async (_id, counter, payload) => {
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            // ...payload,
            countPay: counter + 1
        });
        console.log(data);
        return data;
    },

    decCount: async (_id, counter, payload) => {
        const { data } = await httpService.patch(basketEndpoint + _id, {
            // ...payload,
            _id,
            countPay: counter - 1
        });
        return data;
    },

    // getCount: async () => {
    //     const { data } = await httpService.patch(basketEndpoint);
    //     return data;
    // },

    updateCount: async (payload) => {
        const { data } = await httpService.patch(
            basketEndpoint + payload._id,
            payload
        );
        return data;
    },

    delete: async (id) => {
        const { data } = await httpService.delete(basketEndpoint + id);
        return data;
    }
};

export default basketService;
