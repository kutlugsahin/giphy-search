import * as React from 'react';
import styles from './styles.module.css';
export interface ImageProps {
    aspect: number;
    url: string;
    previewUrl: string;
}

export interface ImageState {
    url: string;
    isPreview: boolean
}

/**
 * Lazy loading Image component
 *
 * @export
 * @class
 * @extends {React.PureComponent<ImageProps, ImageState>}
 */
export default class extends React.PureComponent<ImageProps, ImageState> {
    constructor(props: ImageProps) {
        super(props);   
        this.loadImage = this.loadImage.bind(this);
        this.state = {
            url: props.previewUrl,
            isPreview: true,
        }
    }

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(prevProps: ImageProps) {
        if (prevProps.url !== this.props.url) {
            this.loadImage();
        }
    }

    /**
     * Lazy loads GIF, in the mean time displays a low size still version.
     *
     * @private
     */
    private loadImage() {
        this.setState({
            url: this.props.previewUrl,
            isPreview: true,
        });

        const img = new Image();
        img.src = this.props.url;

        img.onload = () => {
            this.setState({
                url: this.props.url,
                isPreview: false
            });

            img.onload = null;
        }
    }

    public render(): React.ReactNode {

        // padding-top hack to maintain aspect ratio
        const style = {
            paddingTop: `${this.props.aspect * 100 - 1}%`,
            height: 0,
        }

        return (
            <div className={styles.imagebox} style={style}>
                <img className={this.state.isPreview ? styles.blurImage : ''} src={this.state.url} alt={this.state.url}/>
            </div>
        );
    }
}
