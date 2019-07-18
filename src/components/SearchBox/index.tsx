import * as React from 'react';
import { SearchFunction } from '../../providers/ImageProvider/interface';
import { FaSistrix } from 'react-icons/fa';
import styles from './styles.module.css';

export interface SearchBoxProps {
    search: SearchFunction;
}

interface SearchBoxState {
    text: string;
}

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
                    <button type="submit">
                        <FaSistrix size={20} fill="white"/>
                    </button>
                </form>
            </div>
        );
    }
}
