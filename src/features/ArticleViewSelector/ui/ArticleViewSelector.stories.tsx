import type {Meta, StoryObj} from '@storybook/react';

import {ArticleViewSelector} from './ArticleViewSelector';

const meta: Meta<typeof ArticleViewSelector> = {
    title: 'entities/ArticleViewSelector',
    component: ArticleViewSelector,
};

export default meta;

type Story = StoryObj<typeof ArticleViewSelector>;

export const Default: Story = {};
