import React from "react";

function Form({cancel, errors, submit, submitButtonText, elements}) {
    function handleSubmit(event){
        event.preventDefault();
        submit();
    }
    function handleCancel(e){
        e.preventDefault();
        cancel();
    }
    return (
        <div>
            <ErrorDisplay errors = {errors} />
            <form onSubmit = {handleSubmit}>
                {elements()}
                <div>
                    <button type="submit">
                        {submitButtonText}
                    </button>
                </div>
            </form>
        </div>
    )
}

function ErrorDisplay({errors}) {
    let errorsDisplay = null;

    if(errors.length){
        errorsDisplay =(
            <div>
                <h2>Validation errors</h2>
                <ul>
                    {errors.map((error, index) => <li key = {index}>{error}</li>)}
                </ul>
            </div>
        )
    }
    return errorsDisplay;
}

export default Form;