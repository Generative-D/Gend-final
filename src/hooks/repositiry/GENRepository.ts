import { genInstance } from "../../api";

class GENRepository {
  applyStats = async ({
    address,
    chain_address,
  }: {
    address: string;
    chain_address: string;
  }) => {
    const { data } = await genInstance.post(
      `/main-page/apply-stats?address=${address}&chain_address=${chain_address}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  };
  getGenData = async (genId: string) => {
    const { data } = await genInstance.get(`/gen/`, {
      params: genId,
    });
    return data;
  };
  generateImageByPrompt = async ({
    prompt,
    address,
  }: {
    prompt: string;
    address: string;
  }) => {
    const { data } = await genInstance.post(
      `/main-page/generate?prompt=${prompt}&address=${address}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  };

  generateImageWithoutPrompt = async (address: string) => {
    const { data } = await genInstance.post(
      `/main-page/feel-free?address=${address}`,

      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  };

  getImagebyPrompt = async (prompt: string) => {
    const { data } = await genInstance.get(
      `/main-page/get-img-by-prompt?prompt=${prompt}`
    );

    return data;
  };

  getUserAi = async (address: string) => {
    if (!address) {
      throw new Error("Address cannot be null or undefined");
    }
    const response = await genInstance.get(
      `/main-page/get-userai?address=${address}`
    );

    return response.data;
  };

  mine = async ({
    address,
    prompt,
    chain_address,
  }: {
    address: string;
    prompt: string;
    chain_address: string;
  }) => {
    const { data } = await genInstance.post(
      `/main-page/mine?address=${address}&prompt=${prompt}&chain_address=${chain_address}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  };
}

export const genRepository = new GENRepository();
