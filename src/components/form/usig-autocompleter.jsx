import { Autocompleter } from '@usig-gcba/autocompleter';
import { useRef } from 'react';

export default function UsigAutocompleter({
  label,
  name,
  errorMessage = 'Error geolocalizando la dirección',
  setFieldValue,
  ...props
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const autoCompleterRef = useRef(null);

  useEffect(() => {
    if (autoCompleterRef.current) return;
    if (!props.id) {
      console.error('UsigAutocompleter: id prop is required');
      return;
    }
    autoCompleterRef.current = new Autocompleter(
      {
        onCompleteSuggestions: (suggestions) => {
          if (suggestions.length === 0) {
            setSuggestions([]);
          } else {
            setError(null);
          }
        },
        onSuggestions: (suggestions) => {
          setSuggestions(suggestions);
        },
        onError: (error) => {
          console.error('UsigAutocompleter error:', error);
          setError(error);
        },
      },
      options
    );
  }, []);
}
