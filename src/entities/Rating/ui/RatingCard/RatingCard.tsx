import {memo, useCallback, useState} from 'react';

import {useTranslation} from 'react-i18next';

import {useDevice} from '@/shared/lib/hooks/useDevice/useDevice';
import {Button, ButtonSize, ButtonTheme} from '@/shared/ui/Button';
import {Card} from '@/shared/ui/Card';
import {Drawer} from '@/shared/ui/Drawer';
import {Input} from '@/shared/ui/Input';
import {Modal} from '@/shared/ui/Modal';
import {HStack, VStack} from '@/shared/ui/Stack';
import {StarRating} from '@/shared/ui/StarRating';
import {Text} from '@/shared/ui/Text';

interface RatingCardProps {
	className?: string;
	title?: string;
	feedbackTitle?: string;
	hasFeedback?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedback?: string) => void;
	rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {className, onAccept, feedbackTitle, hasFeedback, onCancel, title, rate = 0} = props;
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const isMobile = useDevice();

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept]
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
        </>
    );

    return (
        <Card className={className} max>
            <VStack align='center' gap='8' max>
                <Text title={starsCount ? t('Спасибо за оценку!') : title} />
                <StarRating size={40} onSelect={onSelectStars} selectedStars={rate} />
            </VStack>
            {isMobile ? (
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap='32'>
                        {modalContent}
                        <Button fullWidth onClick={acceptHandle} size={ButtonSize.L}>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            ) : (
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap='32'>
                        {modalContent}
                        <HStack max gap='16' justify='end'>
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                                {t('Закрыть')}
                            </Button>
                            <Button onClick={acceptHandle}>{t('Отправить')}</Button>
                        </HStack>
                    </VStack>
                </Modal>
            )}
        </Card>
    );
});
