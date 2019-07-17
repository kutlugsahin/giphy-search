import * as React from 'react';
import { ImageProviderContext } from '../ImageProvider/context';
import { SearchFunction } from '../ImageProvider/interface';
import debounce from 'lodash.debounce';

import styles from './styles.module.css';

export interface SearchBoxProps {
    search: SearchFunction;
}

interface SearchBoxState {
    text: string;
}

const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" width="20" height="20">
        <path fill="none" stroke="white" strokeWidth="36" strokeLinecap="round" d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110" />
    </svg>
);

export default class extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            text: ''
        }
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.searchbox}>
                <form onSubmit={e => { e.preventDefault(); this.props.search(this.state.text); }}>
                    <input placeholder="search ..." type="text" value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
                    <button type="submit">{searchIcon}</button>
                </form>
            </div>
        );
    }
}
