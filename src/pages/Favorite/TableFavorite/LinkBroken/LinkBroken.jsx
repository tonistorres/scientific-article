import React from 'react';
import imgLinkBroken from '../../../../assets/link.png';
import './LinkBroken.css';

export const LinkBroken = () => {
	return (
		<div className='link-content-main'>
			<img src={imgLinkBroken} alt='link broken' />
			<img src={imgLinkBroken} alt='link broken' />
			<img src={imgLinkBroken} alt='link broken' />
			<img src={imgLinkBroken} alt='link broken' />
			<img src={imgLinkBroken} alt='link broken' />
			<img src={imgLinkBroken} alt='link broken' />
		</div>
	);
};
