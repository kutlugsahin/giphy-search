import * as React from 'react';
import { FaBars, FaTh } from 'react-icons/fa';
import { ImageProviderContext } from '../../providers/ImageProvider';
import { LayoutProviderContext } from '../../providers/LayoutProvider';
import SearchBox from "../SearchBox";
import styles from './styles.module.css';
import { SearchFunction } from '../../providers/ImageProvider/interface';

export interface AppBarProps {
    setImageGridColumns: (size: number) => void;
    search: SearchFunction;
}

/**
 * AppBar component holds search and layout options providing search and layout functions
 */
export const AppBar = (props: AppBarProps) => {
    return (
        <div className={styles.appbar}>
            <span className={styles.brand}>GIPHY Search</span>
            <SearchBox search={props.search} />
            <div className={styles.layoutOptions}>
                <button onClick={() => props.setImageGridColumns(1)} title="Single Column">
                    <FaBars size={24} fill={'#555'} />
                </button>
                <button onClick={() => props.setImageGridColumns(3)} title="Three Columns">
                    <FaTh size={24} fill={'#555'} />
                </button>
            </div>
        </div>
    )
}

export default () => {
    return (
        <ImageProviderContext.Consumer>
            {context => (
                <LayoutProviderContext.Consumer>
                    {layoutContext => <AppBar
                        search={context.search}
                        setImageGridColumns={layoutContext.setImageGridColumns}
                    />}
                </LayoutProviderContext.Consumer>
            )}
        </ImageProviderContext.Consumer>
    );
}