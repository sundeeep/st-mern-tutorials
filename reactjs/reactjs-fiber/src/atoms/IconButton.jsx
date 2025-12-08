

const IconButton = (props) => {
    const {children, className} = props;
    console.log(props)
    return (
        <button className={className ? `${className} p-3 rounded-full bg-black hover:bg-gray-800 text-white cursor-pointer` : "p-3 rounded-full bg-black hover:bg-gray-800 text-white cursor-pointer"}>
            {children}
        </button>
    )
}

export default IconButton