import { FC, ReactNode } from 'react';

interface IconButtonProps {
	children: ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'error';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
	className?: string;
}

const IconButton: FC<IconButtonProps> = ({
	children,
	onClick,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	className = '',
}) => {
	const baseStyles = 'rounded-full cursor-pointer transition flex items-center justify-center';
	const disabledStyles = 'opacity-50 cursor-not-allowed';
	const variantStyles = {
		primary: 'hover:bg-[#212c37] text-slate-100',
		error: 'hover:bg-[#dc26262b] text-red-500',
	};
	const sizeStyles = {
		small: 'p-1',
		medium: 'p-2',
		large: 'p-3',
	};

	const iconButtonStyle = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
		disabled && disabledStyles
	} ${className}`;

	return (
		<div className={iconButtonStyle} onClick={!disabled ? onClick : undefined} aria-disabled={disabled}>
			{children}
		</div>
	);
};

export default IconButton;
