import * as React from 'react';
import { getImages } from '../../api';
import { ImageProviderProps, ImageProvideState, ImageLoadStatus, CancellableCall } from './interface';
import { ImageProviderContext } from './context';

const IMAGE_TAKE_COUNT = 20;


/**
 * Component to provide Image related data to the application using React context api.
 * Acts like a global store providing functions and images
 *
 * @class ImageProvider
 * @extends {React.Component<ImageProviderProps, ImageProvideState>}
 */
class ImageProvider extends React.Component<ImageProviderProps, ImageProvideState> {
    private searchInProgress: CancellableCall | undefined;

    constructor(props: ImageProviderProps) {
        super(props);
        this.search = this.search.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.makeSearch = this.makeSearch.bind(this);

        this.state = {
            images: [],
            status: ImageLoadStatus.NONE,
            offset: 0,
            query: '',
        }
    }

    public render(): React.ReactNode {
        return (
            <ImageProviderContext.Provider value={{
                images: this.state.images,
                search: this.search,
                status: this.state.status,
                loadMore: this.loadMore,
            }}>
                {this.props.children}
            </ImageProviderContext.Provider>
        )
    }

    /**
     * Creates a cancelable call to GIPHY API and updates loading state and image state with the result.
     * Cancellation is required when user make a new search when there is a search in progress
     *
     * @private
     * @param {string} query
     * @param {boolean} [append=false]
     * @memberof ImageProvider
     */
    private makeSearch(query: string, append: boolean = false): CancellableCall {
        let isCanceled = false;
        const currentStatus = this.state.status;

        this.setState({
            status: ImageLoadStatus.LOADING,
            images: append ? this.state.images : []
        });

        getImages(query, this.state.offset, IMAGE_TAKE_COUNT).then(({ images, pagination }) => {
            if (!isCanceled) {
                const nextLoadStatus = pagination.total_count > pagination.offset + pagination.count ? ImageLoadStatus.LOADABLE : ImageLoadStatus.DONE;

                this.setState({
                    query,
                    status: nextLoadStatus,
                    images: append ? [...this.state.images, ...images] : images,
                    offset: append ? this.state.offset + images.length : images.length,
                });
            }
        }).catch(() => {
            if (!isCanceled) {
                this.setState({
                    status: ImageLoadStatus.ERROR,
                })
            }
        }).finally(() => {
            this.searchInProgress = undefined;
        });

        return {
            cancel: () => {
                isCanceled = true;
                this.setState({
                    status: currentStatus
                });
            }
        }
    }


    /**
     * Search function to be shared with context consumers
     * initiates the api call and populates images to the state
     *
     * @private
     * @param {string} query
     * @memberof ImageProvider
     */
    private search(query: string) {
        if (this.searchInProgress) {
            this.searchInProgress.cancel();
        }

        this.searchInProgress = this.makeSearch(query);
    }

    /**
     * Load more function to be shared with context consumers
     * initiates the api call and appends images to the state
     *
     * @private
     * @memberof ImageProvider
     */
    private loadMore() {
        this.makeSearch(this.state.query, true);
    }
}

export default ImageProvider;
