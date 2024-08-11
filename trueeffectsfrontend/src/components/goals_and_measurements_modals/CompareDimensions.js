import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {MenuItem, Select} from "@material-ui/core";
import {CloseButton} from "react-bootstrap";
import {useCompareDimensions} from "../hooks/training/useCompareDimensions";
import {useTranslation} from "react-i18next";

export function CompareDimensions(props) {
    const {t} = useTranslation();
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
                    <Modal.Title>{t("Measurements comparison tool")}</Modal.Title>
                    <CloseButton onClick={props.handleClose} variant="white"/>
                </Modal.Header>
                <Modal.Body>
                    <div className="dimensions__table">
                        <table>
                            <thead>
                            <tr>
                                <th>{t("Parameters")}</th>
                                <th>
                                    <Select
                                        // className="dimensions__select"
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
                            </thead>
                            {Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                                return (
                                    <tr key={element}>
                                        <td>{props.userDimensionConfigurationForCompare[element]}</td>
                                        <td className="td--border">{(firstDimension && firstDimension[element] !== null) ? firstDimension[element]: "-"}</td>
                                        <td className="td--border">{(secondDimension && secondDimension[element]  !== null) ? secondDimension[element]: "-"}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="standard-button" onClick={props.handleClose}>{t("Close")}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}