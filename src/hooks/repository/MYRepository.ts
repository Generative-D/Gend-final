import { genInstance } from "../../api";

class MYRepository {
  getImgByAddress = async (address: string) => {
    const { data } = await genInstance.get(
      `/market-page/get-img-by-address-only-nft?address=${address}`,
      {
        params: {
          address,
        },
      }
    );
    return data;
  };
}

export const myRepository = new MYRepository();
