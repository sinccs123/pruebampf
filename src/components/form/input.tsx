'use client';

import { useField } from 'formik';

interface CustomInputProps {
  name: string;
  rows?: number;
  isrequired?: boolean;
  [x: string]: any;
}

export default function Input({
  name,
  rows,
  isrequired = false,
  ...props
}: CustomInputProps) {
  const [field, meta] = useField(name);
  const fieldValue = field.value !== undefined ? field.value : '';

  const getClassName = () => {
    if (meta.touched && meta.error) return 'inputError input';
    if (meta.touched && !meta.error && field?.value?.length > 0)
      return 'inputOk input';
    return 'input';
  };

  return (
    <div className='relative my-5 w-full'>
      {props.isrequired && (
        <span className='absolute right-2 top-2 text-red-500 text-xl z-[2]'>
          *
        </span>
      )}
      {rows ? (
        <>
          <textarea
            rows={rows}
            {...field}
            {...props}
            className={`${getClassName()} ${props.className}`}
            defaultValue={fieldValue}
          />
          {props.maxLength && (
            <span className='absolute -bottom-6 right-2 text-sm text-gray-500 z-[2]'>
              {fieldValue.length}/{props.maxLength}
            </span>
          )}
        </>
      ) : (
        <input
          {...field}
          {...props}
          className={`${getClassName()} ${props.className}`}
          value={fieldValue || ''}
        />
      )}
      {meta.touched && meta.error ? (
        <p className='error'>{meta.error}</p>
      ) : null}
    </div>
  );
}
