import * as React from 'react';
import styles from './styles.module.css';

export default ({ children }: any) => {
    return (
        <div className={styles.listlayout}>
            <div>
                {children}
            </div>
        </div>
    )
}