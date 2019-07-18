import * as React from 'react';
import styles from './styles.module.css';

export interface GridLayoutProps<T> {
    columns: number;
    renderItem: (item: T) => React.ReactNode;
    items: T[];
}

export default <T extends { id: string }>({ columns, items, renderItem }: GridLayoutProps<T>) => {
    return (
        <div className={styles.gridlayout}>
            <div className={styles.gridinnercontainer}>
                {items.map((item, index) => {
                    return (
                        <div key={`${item.id}${index}`} className={styles.gridbox} style={{ width: `${100 / columns}%` }}>
                            <div className={styles.gridBoxInner}>
                                {renderItem(item)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}