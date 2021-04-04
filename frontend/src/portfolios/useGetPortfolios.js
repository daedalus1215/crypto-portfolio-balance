const useGetPortfolios = () => {
    return [
        {
            name: "Bitcoin",
            code: "btc",
            path: "../temp/btc.json"
        },
        {
            name: "Ether",
            code: "eth",
            path: "../temp/ether.json"
        },
    ];
};

export default useGetPortfolios;