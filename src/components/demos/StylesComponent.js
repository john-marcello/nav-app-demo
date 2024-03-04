import React from "react";
import styled from "styled-components";

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const ModuleDemo = styled.div`
    flex-basis: auto;
    margin: 20px;
    padding: 20px;
    font-size: 20px;
    color: orange;
    border-color: orange;
    border-width: 1px;
    border-style: solid;
`;

function StylesComponent() {
    return (
        <FlexContainer>
            <ModuleDemo>Styled component as a function.</ModuleDemo>
        </FlexContainer>
    );
};

export default StylesComponent;
