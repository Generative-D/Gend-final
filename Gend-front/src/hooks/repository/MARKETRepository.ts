import { genInstance } from "../../api";

class MARKETRepository {
  getImageList = async () => {
    const { data } = await genInstance.get(`/market-page/get-img-list`);
    return data;
  };

  getAiList = async () => {
    const { data } = await genInstance.get(`/market-page/get-ai-list`);
    return data;
  };

  getNftList = async () => {
    const { data } = await genInstance.get(
      `/market-page/get-img-list-only-nft`
    );
    return data;
  };

  getNftByAddress = async (address: string) => {
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

  buyImg = async ({
    prompt,
    chain_address,
    address,
  }: {
    prompt: string;
    chain_address: string;
    address: string;
  }) => {
    const { data } = await genInstance.post(
      `/market-page/buy-img?prompt=${prompt}&chain_address=${chain_address}&address=${address}`,
      {
        prompt,
        chain_address,
        address,
      }
    );
    return data;
  };
}

export const marketRepository = new MARKETRepository();
