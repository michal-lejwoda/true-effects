import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MenuItem, Select} from "@material-ui/core";
import {useCompareDimensions} from "../hooks";
import {CloseButton} from "react-bootstrap";

export function CompareDimensions(props) {
    const {
        firstDimension,
        secondDimension,
        handleFirstDimensionChange,
        handleSecondDimensionChange
    } = useCompareDimensions(props.userDimensions)
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Porównywarka pomiarów</Modal.Title>
                    <CloseButton onClick={props.handleClose} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <div className="dimensions__table">
                        <table>
                            <tr>
                                <th>Parametry</th>
                                <th>
                                    <Select
                                        className="dimensions__select"
                                        onChange={handleFirstDimensionChange}
                                        value={firstDimension && firstDimension.id}
                                    >
                                        {Object.values(props.userDimensions).map(el => {
                                            return (
                                                <MenuItem key={el.id} value={el.id}>{el.date}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </th>
                                <th>
                                    <Select onChange={handleSecondDimensionChange}
                                            value={secondDimension && secondDimension.id}
                                    >
                                        {Object.values(props.userDimensions).map(el => {
                                            return (
                                                <MenuItem key={el.id} value={el.id}>{el.date}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </th>
                            </tr>
                            {Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                                return (
                                    <tr key={element}>
                                        <td>{props.userDimensionConfigurationForCompare[element]}</td>
                                        <td>{firstDimension && firstDimension[element]}</td>
                                        <td>{secondDimension && secondDimension[element]}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button" onClick={props.handleClose}>Zamknij okno</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}