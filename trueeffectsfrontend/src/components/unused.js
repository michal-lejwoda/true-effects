    const handleInputs = (event) => {
        // destructuring the object
        let {target} = event;
        let {name, value} = target;

        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }