import * as React from 'react';

import ImageProvider from "../providers/ImageProvider";
import LayoutProvider from "../providers/LayoutProvider";

export const TestProvider = ({children}: any) => {
    return (
        <ImageProvider>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </ImageProvider>
    )
}