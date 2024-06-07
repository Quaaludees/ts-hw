const enum TypesMethods {
    Get = 'get',
    Post = 'post',
    Patch = 'patch',
    Put = 'put',
    Delete = 'delete'
}

interface IBaseRequest {
    body?: Record<string, unknown>;
    headers: Record<string, string>;
    url: string;
}

interface IRequest extends IBaseRequest {
    method: TypesMethods;
}

class RequestBuilder {
    private methods: TypesMethods[] = [];
    private body: IBaseRequest['body'] = {};
    private headers: IBaseRequest['headers'] = {};
    private urls: IBaseRequest['url'][] = [];

    setBody(body: IBaseRequest['body']) {
        if (Object.keys(this.body || {}).length === 0) {
            this.body = body;
        }
        return this;
    }

    setHeaders(headers: IBaseRequest['headers']) {
        if (Object.keys(this.headers).length === 0) {
            this.headers = headers;
        }
        return this;
    }

    addUrl(url: IBaseRequest['url']) {
        if (this.urls.includes(url)) {
            return this;
        }
        this.urls.push(url);
        return this;
    }

    addMethod(method: TypesMethods) {
        if (this.methods.includes(method)) {
            return this;
        }
        this.methods.push(method);
        return this;
    }

    private canAddBody(method: TypesMethods) {
        return [TypesMethods.Put, TypesMethods.Post, TypesMethods.Patch].includes(method);
    }

    build(): IRequest[] {
        const res: IRequest[] = [];
        for (const method of this.methods) {
            for (const url of this.urls) {
                if (this.canAddBody(method)) {
                    res.push({
                        method,
                        url,
                        body: this.body,
                        headers: this.headers
                    });
                } else {
                    res.push({
                        method,
                        url,
                        headers: this.headers
                    });
                }
            }
        }
        return res;
    }
}

console.log(new RequestBuilder()
    .addMethod(TypesMethods.Get)
    .addMethod(TypesMethods.Put)
    .setBody({
        name: 'Vasa'
    })
    .setHeaders({
        date: new Date().toISOString()
    })
    .addUrl('https://google.com')
    .addUrl('https://ya.com')
    .build()
)