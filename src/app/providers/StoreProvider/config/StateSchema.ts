import {CounterSchema} from 'entities/Counter';
import {CombinedState} from 'redux';
import {AxiosInstance} from 'axios';
import {UserSchema} from 'entities/User';
import {LoginSchema} from 'features/AuthByUsername';
import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import {ProfileSchema} from 'entities/Profile';
import {ArticleDetailsSchema} from 'entities/Article';
import {ArticleDetailsCommentsSchema} from 'pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema';
import {AddCommentFormSchema} from 'features/addCommentForm';
import {ArticlesPageSchema} from 'pages/ArticlesPage/model/types/articlesPageSchema';
import {UISchema} from 'features/UI';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;

	// Асинхронные редюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	articleDetailsComments?: ArticleDetailsCommentsSchema;
	addCommentForm?: AddCommentFormSchema;
	articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (
		state: StateSchema,
		action: AnyAction
	) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
	state: StateSchema;
}