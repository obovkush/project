import type {Meta, StoryObj} from '@storybook/react';
import {NotificationList} from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof NotificationList> = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [StoreDecorator({})],
};

export default meta;

type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {
    render: () => <NotificationList />,
};