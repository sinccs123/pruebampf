import { useField } from 'formik';

interface CustomCheckboxProps {
  text: string;
  name: string;
}

export default function Checkbox({ text, name }: CustomCheckboxProps) {
  const [field] = useField({ name, type: 'checkbox' });
  return (
    <label className='text-sm flex items-center' htmlFor={name}>
      <input type='checkbox' className='checkbox' id={name} {...field} />
      {text}
    </label>
  );
}
