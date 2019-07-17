import { ImageData } from '../../api';

export type SearchFunction = (query: string) => void;

export interface ImageProviderProps {
    children: React.ReactNode;
}

export enum ImageLoadStatus {
    NONE,
    LOADABLE,
    LOADING,
    DONE,
    ERROR,
}

export interface ImageProvideState {
    images: ImageData[];
    offset: number;
    status: ImageLoadStatus;
    query: string;
}

export interface ImageProviderContextData {
    images: ImageData[];
    status: ImageLoadStatus;
    search: SearchFunction;
    loadMore: () => void;
};

export interface CancellableCall {
    cancel: () => void;
}