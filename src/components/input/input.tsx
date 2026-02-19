type InputProps = {
    label?: string
    initialValue?: string
    id?: string
    name?: string
    type?: string

    value?: string | number
    onChange: (val: string) => void;
    onFocus?: () => void
    error?: string

    leftLabel?: boolean
    placeholder?: string

    readOnly?: boolean
    className?: string
    customStyling?: string

    width?: string
    wrapperStyling?: string
}

export const Input = (props: InputProps) => {

    const {
        label,
        id,
        name,
        type,
        readOnly,
        onChange,
        onFocus,
        value,
        error,
        className,
        customStyling,
        placeholder,
        wrapperStyling
    } = props;

    return <div className={wrapperStyling}>
        {label && <div className="text-xs">{label}</div>}
        <input
            id={id}
            name={name}
            type={type || "text"}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            readOnly={readOnly}
            onFocus={onFocus}
            className={ className || `
                py-[8px]
                px-[20px]
                w-full
                rounded-full
                grow 
                color-black 
                text-xs
                bg-white 
                fill-white
                border-1 
                border-gray-200
                outline-0
                ${customStyling}
            `}
        />
        <div className="text-[10px] text-red-700">{error}</div>
    </div>
}