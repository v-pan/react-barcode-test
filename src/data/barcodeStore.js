import { observable, flow } from "mobx";

class BarcodeStore {
  @observable code = undefined;
  @observable json;

  @observable state = "pending";

  readJson = flow(function*() {
    this.state = "pending"
    try {
      const response = yield fetch("https://world.openfoodfacts.org/api/v0/product/" + code + ".json");
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
      }

      const data = yield response.json();
      console.log(data.status_verbose);

      this.state = "done"
      this.json = data
    } catch (e) {
      console.error(e)
      this.state = "error"
    }
  })

//  readJson = async (code) => {
//    try {
//      const response = await fetch("https://world.openfoodfacts.org/api/v0/product/" + code + ".json");
//      if (!response.ok) {
//        throw new Error("HTTP Error: " + response.status);
//      }
//      const data = await response.json();
//      console.log(data.product.product_name_en);
//
//      return data;
//    }
//    catch (err) {
//      console.log(err);
//    }
//  }
}

export default barcodeStore = new BarcodeStore()
