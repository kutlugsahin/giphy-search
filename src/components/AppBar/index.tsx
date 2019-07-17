import * as React from 'react';

import SearchBox from "../SearchBox";
import styles from './styles.module.css';
import { ImageProviderContext } from '../ImageProvider/context';

/**
 * AppBar component holds search and layout options providing search and layout functions
 */
export default () => {
    return (
        <ImageProviderContext.Consumer>
            {context => (
                <div className={styles.appbar}>
                    <span className={styles.brand}>GIPHY Search API</span>
                    <SearchBox search={context.search} />
                </div>
            )}
        </ImageProviderContext.Consumer>
    );
}