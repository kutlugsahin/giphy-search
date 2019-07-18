export interface ImageData {
    url: string;
    originalUrl: string;
    width: number;
    height: number;
    id: string;
    title: string;
}

export interface ImageQueryResult {
    images: ImageData[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    }
}

function toQueryresult(data: any): ImageData {
    return {
        url: data.images.fixed_width.url,
        height: data.images.fixed_width.height,
        width: data.images.fixed_width.width,
        id: data.id,
        originalUrl: data.images.original.url,
        title: data.title
    }
}

export function getImages(query: string, offset: number, take: number = 20): Promise<ImageQueryResult> {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&q=${query}&limit=${take}&offset=${offset}&rating=G&lang=en`)
        .then(result => {
            if (result.status >= 200 && result.status < 300) {
                return result.json();
            }

            return Promise.reject(result.statusText);
        }).then(response => {
            return {
                images: response.data.map(toQueryresult),
                pagination: response.pagination,
            }
        })
}