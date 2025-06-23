import { FC, ReactNode } from "react";
import { TIcons } from "../../../../types/icons.type";
import { Avatar } from "antd";
import Icon from "../../../../components/icon/Icon";
import useImageValidation from "../../../../hooks/useImageValidation";
import ImageLoaderWraper from "../../../../components/ui/ImageLoaderWraper";

interface INotificationItemProps {
    image?: string;
    name: string;
    icon?: TIcons;
    firstLine: ReactNode;
    secondLine: ReactNode;
    isUnread: boolean;
    time: string;
    onMarkAsRead?: () => void;
}
const NotificationItem: FC<INotificationItemProps> = ({
    image,
    icon,
    firstLine,
    secondLine,
    isUnread,
    time,
    onMarkAsRead,
}) => {
    const {imageUrl, loading} = useImageValidation(image);
    return (
        <div className='flex min-w-[24rem] z-[999999999] gap-2'>
            <div className='relative flex-shrink-0'>
                <ImageLoaderWraper loading={loading} height='h-12'>
                    <img src={imageUrl} alt='' className='h-12 w-12 rounded-full' />
                </ImageLoaderWraper>
            </div>
            <div className='grow'>
                <div className='flex gap-2'>{firstLine}</div>
                <div className='flex gap-2'>{secondLine}</div>
                {isUnread && onMarkAsRead && (
                    <button
                        onClick={onMarkAsRead}
                        className='mt-1 text-xs text-blue-500 hover:underline'>
                        Mark as read
                    </button>
                )}
            </div>
            <div className='relative flex flex-shrink-0 items-center'>
                {isUnread && (
                    <span className='absolute end-0 top-0 flex h-2 w-2'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75' />
                        <span className='relative inline-flex h-2 w-2 rounded-full bg-red-500' />
                    </span>
                )}
                <div className='text-zinc-500'>{time}</div>
            </div>
        </div>
    );
};


export default NotificationItem