import * as React from 'react';
import styles from './styles.module.css';
export interface ImageProps {
    aspect: number;
    url: string;
}

class Image extends React.PureComponent<ImageProps> {
    public render(): React.ReactNode {

        // padding-top hack to maintain aspect ratio
        const style = {
            paddingTop: `${this.props.aspect * 100 - 1}%`,
            height: 0,
        }

        return (
            <div className={styles.imagebox} style={style}>
                <img src={this.props.url} />
            </div>
        );
    }
}

export default Image;
