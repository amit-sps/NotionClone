import { useCallback, useState } from "react";
import _debounce from "lodash/debounce";

function InputDebounce(call) {
  const [value, setValue] = useState("");

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue) {
    call(inputValue);
  }

  function handleChange(event) {
    setValue(event.target.value);
    debounceFn(event.target.value);
  }

  return <input value={value} onChange={handleChange} />;
}
export default InputDebounce;
