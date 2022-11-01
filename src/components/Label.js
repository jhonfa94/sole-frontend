const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} form-label inline-block mb-2 text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
