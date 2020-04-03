export const createBarcodeStore = () => {
    const store = {
        code: string,
        json: object,
        state: string,
        async readJson() {
            this.state = "pending"
            try {
                const response = await fetch("https://world.openfoodfacts.org/api/v0/product/" + code + ".json");
                if (!response.ok) {
                    throw new Error("HTTP Error: " + response.status);
                }

                const data = await response.json();
                console.log(data.status_verbose);

                this.state = "done"
                this.json = data
            } catch (e) {
                console.error(e)
                this.state = "error"
            }
        }
    }

    return store
}