import { Avatar } from "antd";
import { FC, ReactNode } from "react";
import ImageLoaderWraper from "../../../../../../components/ui/ImageLoaderWraper";
import useImageValidation from "../../../../../../hooks/useImageValidation";

interface IMessageItemProps {
    image?: string;
    name: string;
    isOnline: boolean;
    text: ReactNode;
    isUnread: boolean;
    time: string;
}
const MessageItem: FC<IMessageItemProps> = ({ image, name, isOnline, text, isUnread, time }) => {
    const {imageUrl, loading} = useImageValidation(image);
    console.log({isOnline});
    

    

    return (
        <div className='flex min-w-[24rem] gap-2'>
            <div className='relative flex-shrink-0'>
                <ImageLoaderWraper loading={loading} height='h-12'>
                    <img src={imageUrl} alt='' className='h-12 w-12 rounded-full' />
                </ImageLoaderWraper>
            </div>
            <div className='grow-0'>
                <div className='flex gap-2 font-bold'>{name}</div>
                <div className='flex w-[18rem] gap-2 text-zinc-500'>
                    <span className='truncate'>{text}</span>
                </div>
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


export default MessageItem