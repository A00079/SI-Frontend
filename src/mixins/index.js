export const Globalmixin = {
    data: () => ({
        ds: {},
    }),
    watch: {
    },
    computed: {
    },
    methods: {
        $isNumber(value) {
            return !isNaN(Number(value));
        }
    }
};

export default Globalmixin;
