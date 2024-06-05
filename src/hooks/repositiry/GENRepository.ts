import { genInstance } from "../../api";

class GENRepository {
  getGenData = async (genId: string) => {
    const { data } = await genInstance.get(`/gen/`, {
      params: genId,
    });
    return data;
  };
  generateImageByPrompt = async (prompt: string) => {
    const params = new URLSearchParams();
    params.append("prompt", prompt);
    const { data } = await genInstance.post(`/generate`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  };
}

export const genRepository = new GENRepository();
