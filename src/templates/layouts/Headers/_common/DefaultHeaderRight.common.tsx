import React from 'react';
import NotificationPartial from '../_partial/Notification.partial';
import SettingsPartial from '../_partial/Settings.partial';
import LanguageSelectorPartial from '../_partial/LanguageSelector.partial';
import MessagesPartial from '../_partial/messages/Messages.partial';

const DefaultHeaderRightCommon = () => {
	return (
		<div className='!z-30 flex items-center gap-4'>
			<MessagesPartial />
			<NotificationPartial />
			<SettingsPartial />
			<LanguageSelectorPartial />
		</div>
	);
};

export default DefaultHeaderRightCommon;
