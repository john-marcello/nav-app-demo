import React from "react";

// as a function and exported as a default separately
function StylesInline() {

    const flexContainer = {
        display: "flex",
        justifyContent: "center",
    };
    const inlineDemo = {
        flexBasis: "auto",
        margin: "20px",
        padding: "20px",
        fontSize: "20px",
        color: "red",
        borderColor: "red",
        borderWidth: "1px",
        borderStyle: "solid",
    };

    return (
        <div style={flexContainer}>
            <div style={inlineDemo}>Inline style as a function.</div>
        </div>
    );
}


// as a named arrow function and exported as a default separately
// const StylesInline = () => {
//     <span>add jsx here</span>
// };


// as a combined exported default function
// export default function StylesInline() {
//     <span>add jsx here</span>
// }

export default StylesInline;