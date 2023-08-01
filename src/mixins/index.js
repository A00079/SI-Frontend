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
        },
        $generateUniqueId() {
            const randomNum = Math.floor(Math.random() * 100000);
            const timestamp = Date.now();
            const uniqueId = `${randomNum}${timestamp}`;
            if (uniqueId.length > 5) {
                return uniqueId.slice(0, 5);
            }
            return uniqueId;
        }
    }
};

export default Globalmixin;
