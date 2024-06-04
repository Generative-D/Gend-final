import { genInstance } from "../../api";

class GENRepository {
  getGenData = async (genId: string) => {
    const { data } = await genInstance.get(`/gen/`, {
      params: genId,
    });
    return data;
  };
  gerateImageByPrompt = async (prompt: string) => {
    const { data } = await genInstance.post(`/generate`, {
      prompt: prompt,
    });
    return data;
  };
}

export const genRepository = new GENRepository();
