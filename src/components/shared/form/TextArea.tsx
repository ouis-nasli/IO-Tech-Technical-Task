import React, { forwardRef } from 'react';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	helperText?: string;
	error?: boolean;
	errorMessage?: string;
	required?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
	(
		{
			label,
			name,
			helperText,
			error = false,
			errorMessage,
			required = false,
			placeholder = '',
			disabled = false,
			rows = 4,
			...rest
		},
		ref
	) => {
		return (
			<div className='w-full mb-4'>
				{label && (
					<label htmlFor={name} className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						{label} {required && <span className='text-red-500'>*</span>}
					</label>
				)}

				<textarea
					id={name}
					name={name}
					ref={ref}
					placeholder={placeholder}
					disabled={disabled}
					aria-invalid={error}
					rows={rows}
					className={`w-full px-4 py-2 rounded-md border transition-colors duration-200 focus:outline-none ${
						error
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
					} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800`}
					{...rest}
				/>

				{(errorMessage || helperText) && (
					<p className={`text-sm mt-1 ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
						{error ? errorMessage : helperText}
					</p>
				)}
			</div>
		);
	}
);

TextArea.displayName = 'TextArea';

export default TextArea;
