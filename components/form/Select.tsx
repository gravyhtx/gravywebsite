import { ChangeEvent, FC, Fragment, useState } from "react"

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  allowMultiSelect?: boolean;
}
const Select: FC<Props> = ({ options, allowMultiSelect }): JSX.Element => {

  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    setSelected(Array.from(options).filter((opts) => opts.selected).map((opts) => opts.value));
  }

  const Options = (): JSX.Element => {
    return (<Fragment>
      { options.map((item, index) => {
        return (
          <option selected={selected.includes(item.value)} value={item.value} key={index}>
            { item.label }
          </option>
        )})}
    </Fragment>)
  }

  const SelectGroup = (): JSX.Element => {
    return (<>
      <select value={ selected } onChange={ handleChange } multiple={ allowMultiSelect }>
        <Options />
      </select>
    </>)
  }

  return <SelectGroup />;
}

export default Select;