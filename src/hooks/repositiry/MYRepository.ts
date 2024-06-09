import { genInstance } from "../../api";

class MYRepository {
  getImgByAddress = async (address: string) => {
    const { data } = await genInstance.get(
      `/my-page/get-img-by-address-only-nft/${address}`
    );
    return data;
  };
}

export const myRepository = new MYRepository();
