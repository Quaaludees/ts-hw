interface IRequestMain {
    getProductById(id: number): Promise<any | undefined>;
}

class RequestAPI implements IRequestMain {
    async getProductById(id: number): Promise<any | undefined> {
        const data = await fetch(`https://dummyjson.com/products/${id}`);
         return await data.json();
    }
}

class RequestProxy implements IRequestMain {
    constructor(private api: RequestAPI) {
    }
    async getProductById(id: number): Promise<any | undefined> {
        if (id > 10) {
            console.log('Mnogo hochesh uhodi');
            return undefined;
        }
        return await this.api.getProductById(id);
    }
}

const proxy1 = new RequestProxy(new RequestAPI());
const proxy2 = new RequestProxy(new RequestAPI());

// ( async ()=> {
//     console.log(await proxy1.getProductById(5));
//     console.log(await proxy1.getProductById(11));
// })();

proxy1.getProductById(5).then(res => {
    console.log(res)
});