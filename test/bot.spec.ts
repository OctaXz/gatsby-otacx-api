
import {fetchInfo} from "../api/bestRoute";
import {getAmountOutX} from "../utils/findRate";

describe("best route", () => {
  it("best route", async () => {
   // const amountResponse = await getAmountOutX(10,['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56']);
    const  amountResponse = await  fetchInfo(200,2)
    console.log(amountResponse)
    expect(amountResponse).toBeDefined();
  });
});
