import { memo } from 'react';
import ProgressLoader from '../loader/ProgressLoader';

type Variant = 'contained' | 'outlined' | 'text';
type Color = 'primary' | 'error' | 'default';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	color?: Color;
	size?: Size;
	isLoading?: boolean;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	variant = 'contained',
	color = 'default',
	size = 'medium',
	isLoading = false,
	children,
	disabled = false,
	className = '',
	...props
}) => {
	const baseStyles =
		'flex items-center justify-center gap-x-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const sizeStyles = {
		small: 'px-3 py-1 text-sm',
		medium: 'px-4 py-2 text-base',
		large: 'px-5 py-3 text-lg',
	};

	const colorStyles = {
		primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
		error: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
		default: 'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
	};

	const variantStyles = {
		contained: colorStyles[color],
		outlined: `border ${color === 'primary' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : ''} ${
			color === 'error' ? 'border-red-600 text-red-600 hover:bg-red-50' : ''
		} ${color === 'default' ? 'border-gray-400 text-gray-800 hover:bg-gray-100' : ''}`,
		text: ` px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`,
	};

	const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

	return (
		<button type='button' className={buttonStyles} disabled={disabled || isLoading} {...props}>
			{isLoading ? <ProgressLoader /> : null}
			{children}
		</button>
	);
};

/**
 * A reusable button component with multiple variants, colors, and sizes.
 * Supports loading state and uses a `ProgressLoader` when `isLoading` is true.
 * This component is memoized for performance optimization.
 *
 * @component
 * @example
 * // Example usage with default props:
 * <Button>Click Me</Button>
 *
 * @example
 * // Example usage with a primary variant:
 * <Button variant="contained" color="primary" size="large">Submit</Button>
 *
 * @example
 * // Example usage with outlined variant and error color:
 * <Button variant="outlined" color="error" isLoading>Loading...</Button>
 *
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * // Example usage with additional attributes:
 * <Button onClick={handleClick} disabled={isDisabled}>Save</Button>
 */

export default memo(Button);
