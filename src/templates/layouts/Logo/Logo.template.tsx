import React, { FC, HTMLAttributes } from 'react';
import colors from 'tailwindcss/colors';
import logoNew from '../../../assets/logo-new.png';
import themeConfig from '../../../config/theme.config';

type ILogoTemplateProps = HTMLAttributes<HTMLOrSVGElement>;
const LogoTemplate: FC<ILogoTemplateProps> = (props) => {
	const { ...rest } = props;
	return (
		<img src={logoNew} alt="logo" {...rest} />
	);
};

export default LogoTemplate;
