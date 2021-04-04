import useFetchBtcWithTotal from "../useFetchBtcWithTotal";

const useGetPortfolios = () => {
    return [
        {
            name: "Bitcoin",
            code: "btc",
            color: "#FFD700",
            assetActivity: useFetchBtcWithTotal("../temp/btc.json")
        },
        {
            name: "Ether",
            code: "eth",
            color: "#77f",
            assetActivity: useFetchBtcWithTotal("../temp/ether.json")
        },
    ];
};

export default useGetPortfolios;