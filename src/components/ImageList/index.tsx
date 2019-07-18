import * as React from 'react';
import { ImageProviderContext } from '../../providers/ImageProvider';
import { ImageData } from '../../api';
import { ImageLoadStatus } from '../../providers/ImageProvider/interface';
import InfiniteScroller from '../InfiniteScroller';
import Image from '../Image';
import styles from './styles.module.css';
import GridLayout from './GridLayout';
import { LayoutProviderContext } from '../../providers/LayoutProvider';

export interface ImageListProps {
    images: ImageData[];
    status: ImageLoadStatus;
    loadMore: () => void;
    columns: number;
}

/**
 * A consumer component of ImageProvider
 * Provides the image data and search functions to its children
 *
 * @class ImageList
 * @extends {React.Component<ImageListProps>}
 */
export class ImageList extends React.Component<ImageListProps> {
    constructor(props: ImageListProps) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
        this.renderEmptyContent = this.renderEmptyContent.bind(this);
        this.renderImageGrid = this.renderImageGrid.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <InfiniteScroller onLoad={this.props.loadMore} status={this.props.status} requestLoadProximity={200}>
                <div className={styles.contentContainer}>
                    {this.renderContent()}
                </div>
            </InfiniteScroller>
        );
    }

    private renderContent() {
        switch (this.props.status) {
            case ImageLoadStatus.NONE:
                return this.renderEmptyContent();
            default:
                return this.renderImageGrid();
        }
    }

    private renderEmptyContent() {
        return (
            <div className={styles.info}>
                Make a search to display GIFs
            </div>
        )
    }

    private renderImageGrid() {
        return (
            <div className={this.props.columns === 1 ? styles.singleColumnLayout : styles.multiColumnLayout}>
                <GridLayout items={this.props.images} columns={this.props.columns} renderItem={this.renderImage} />
            </div>
        );
    }

    private renderImage(image: ImageData, index?: number) {
        return <Image aspect={image.height / image.width} url={image.url} key={`${image.id}${index}`} />
    }
}

export default () => (
    <ImageProviderContext.Consumer>
        {context => (
            <LayoutProviderContext.Consumer>
                {layoutContext => (
                    <ImageList
                        images={context.images}
                        status={context.status}
                        loadMore={context.loadMore}
                        columns={layoutContext.imageGridColumns}
                    />
                )}
            </LayoutProviderContext.Consumer>
        )}
    </ImageProviderContext.Consumer>
);
