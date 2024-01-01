import React from 'react';


export const PasswordItems = () => {
    return (
        <form>
            <h2>Zmiana hasła</h2>
            <label htmlFor="">Stare hasło</label>
            <input type="text"/>
            <label htmlFor="">Nowe hasło</label>
            <input type="text"/>
            <label htmlFor="">Powtórz nowe hasło</label>
            <input type="text"/>
            <button type="submit">Zapisz nowe hasło</button>
        </form>
    );
};
