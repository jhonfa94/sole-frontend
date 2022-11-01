const Multiselect = ({ className, children, ...props }) => (
    <select
        className={`${className} form-multiselect block w-full mt-1`}
        multiple
        {...props}>
        {children}
    </select>
)

export default Multiselect
