import { genInstance } from "../../api";

class GENRepository {
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
}

export const genRepository = new GENRepository();
