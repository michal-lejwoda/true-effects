import React from 'react';
import {Form} from "react-bootstrap";

export const DimensionItems = () => {
    return (
        <Form>
            <h2>Ustawienia pomiarów</h2>
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="weight"
                label="Wyświetlaj wagę"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj wzrost"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj lewy biceps"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj prawy biceps"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj lewe przedramię"
            /><Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj prawe przedramię"
            /><Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj lewą nogę"
            /><Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj prawą nogę"
            /><Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                name="growth"
                label="Wyświetlaj bodyfat"
            />
            
            
            
            
            
        </Form>
    );
};

