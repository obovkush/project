import {FC, PropsWithChildren, useEffect} from 'react';

import {Reducer} from '@reduxjs/toolkit';
import {useDispatch, useStore} from 'react-redux';

import {ReduxStoreWithManager, StateSchema, StateSchemaKey} from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<PropsWithChildren<DynamicModuleLoaderProps>> = (props) => {
    const {children, reducers, removeAfterUnmount = true} = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            if(!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({type: `@INIT ${name} reducer`});
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name,]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({type: `@DESTROY ${name} reducer`});
                });
            }
        };
        // eslint-disable-next-line
	}, []);

    return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
