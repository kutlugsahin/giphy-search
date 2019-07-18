import * as React from 'react';

interface LayoutProviderContext {
    imageGridColumns: number;
    setImageGridColumns: (size: number) => void;
}

export const LayoutProviderContext = React.createContext<LayoutProviderContext>({
    imageGridColumns: 1,
    setImageGridColumns: () => {}
});

export default class extends React.Component<{}, LayoutProviderContext> {
    constructor(props: {}) {
        super(props);
        this.setImageGridColumns = this.setImageGridColumns.bind(this);

        this.state = {
            imageGridColumns: 1,
            setImageGridColumns: this.setImageGridColumns,
        };
    }

    private setImageGridColumns(size: number) {
        this.setState({
            imageGridColumns: size
        });
    }

    public render() {
        return (
            <LayoutProviderContext.Provider value={{
                imageGridColumns: this.state.imageGridColumns,
                setImageGridColumns: this.setImageGridColumns
            }}>
                {this.props.children}
            </LayoutProviderContext.Provider>
        )
    }
}