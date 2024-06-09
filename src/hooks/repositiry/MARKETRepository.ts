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
}

export const marketRepository = new MARKETRepository();
