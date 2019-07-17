import * as React from 'react';
import { ImageLoadStatus } from '../ImageProvider/interface';
import debounce from 'lodash.debounce';
import styles from './styles.module.css';

export interface InfiniteScrollerProps {
    onLoad: () => void;
    status: ImageLoadStatus;
    requestLoadProximity?: number;
}

/**
 * Component that is responsible of tracking the scroll event and calling onLoad function prop in case 
 * bottom distance of the scroll area has reached to given requestLoadProximity
 * 
 * Renders the given children in the scrollable container and also loading indicator and error indicator at the bottom
 *
 * @class InfiniteScroller
 * @extends {React.Component<InfiniteScrollerProps>}
 */
class InfiniteScroller extends React.Component<InfiniteScrollerProps> {
    private scrollContainer: React.RefObject<HTMLDivElement> = React.createRef();

    public static defaultProps: Partial<InfiniteScrollerProps> = {
        requestLoadProximity: 0
    }

    constructor(props: InfiniteScrollerProps) {
        super(props);
        this.renderStatus = this.renderStatus.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
        this.onScroll = debounce(this.onScroll.bind(this), 100);
    }

    componentDidMount() {
        if (this.scrollContainer.current) {
            this.scrollContainer.current.addEventListener('scroll', this.onScroll);
        }
    }

    componentWillUnmount() {
        if (this.scrollContainer.current) {
            this.scrollContainer.current.removeEventListener('scroll', this.onScroll);
        }
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.scroller} ref={this.scrollContainer}>
                {this.props.children}
                {this.renderStatus()}
            </div>
        );
    }

    private renderStatus() {
        switch (this.props.status) {
            case ImageLoadStatus.LOADING:
            case ImageLoadStatus.LOADABLE:
                return this.renderSpinner();
            case ImageLoadStatus.ERROR:
                return 'Error'
            case ImageLoadStatus.DONE:
                return null;
        }
    }

    private renderSpinner() {
        return (
            <div className={styles.spinnercontainer}>
                <span className={styles.spinner}>◠</span>
            </div>
        )
    }

    /**
     * Debounced function to be called on scroll event
     * Calculates the scroll distance and if the distance to bottom is less then requestLoadProximity
     * calls onLoad prop
     *
     * @private
     * @memberof InfiniteScroller
     */
    private onScroll() {
        if (this.scrollContainer.current) {
            if (this.props.status === ImageLoadStatus.LOADABLE) {
                const scroller = this.scrollContainer.current;

                const distanceToBottom = (scroller.scrollHeight - scroller.offsetHeight) - scroller.scrollTop;

                if (distanceToBottom <= (this.props.requestLoadProximity || 0)) {
                    this.props.onLoad()
                }
            }
        }
    }
}

export default InfiniteScroller;
