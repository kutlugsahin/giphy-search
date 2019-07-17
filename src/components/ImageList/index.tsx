import * as React from 'react';
import { ImageProviderContext } from '../ImageProvider/context';
import { ImageData } from '../../api';
import { ImageLoadStatus } from '../ImageProvider/interface';
import InfiniteScroller from '../InfiniteScroller';
import Image from '../Image';
import ListLayout from './ListLayout';
import styles from './styles.module.css';

export interface ImageListProps {
    images: ImageData[];
    status: ImageLoadStatus;
    loadMore: () => void;
}

/**
 * A consumer component of ImageProvider
 * Provides the image data and search functions to its children
 *
 * @class ImageList
 * @extends {React.Component<ImageListProps>}
 */
class ImageList extends React.Component<ImageListProps> {
    constructor(props: ImageListProps) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <InfiniteScroller onLoad={this.props.loadMore} status={this.props.status} requestLoadProximity={200}>
                {this.renderContent()}
            </InfiniteScroller>
        );
    }

    private renderContent() {
        if (this.props.status === ImageLoadStatus.NONE) {
            return (
                <div className={styles.info}>
                    Make a search to display GIFs
                </div>
            )
        }

        return (
            <ListLayout>
                {this.props.images.map(this.renderImage)}
            </ListLayout>
        );
    }

    private renderImage(image: ImageData, index: number) {
        // const height = (ImageTileWidth / image.width) * image.height;
        return <Image aspect={image.height / image.width} url={image.url} key={`${image.id}${index}`}/>
    }
}

export default () => (
    <ImageProviderContext.Consumer>
        {context => <ImageList images={context.images} status={context.status} loadMore={context.loadMore}/>}
    </ImageProviderContext.Consumer>
);
