import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MenuItem, Select} from "@material-ui/core";

export function CompareDimensions(props) {
    const [firstDimension, setFirstDimension] = useState({})
    const [secondDimension, setSecondDimension] = useState({})

    const handleFirstDimensionChange = (event) => {
        setFirstDimension(props.userDimensions.find(x => x.id === event.target.value))
    }

    const handleSecondDimensionChange = (event) => {
        setSecondDimension(props.userDimensions.find(x => x.id === event.target.value))
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Porównywarka pomiarów</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr>
                            <th>Parametry</th>
                            <th>
                                <Select onChange={handleFirstDimensionChange}>
                                    {Object.values(props.userDimensions).map(el => {
                                        return (
                                            <MenuItem value={el.id}>{el.date}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </th>
                            <th>
                                <Select onChange={handleSecondDimensionChange}>
                                    {Object.values(props.userDimensions).map(el => {
                                        return (
                                            <MenuItem value={el.id}>{el.date}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </th>
                        </tr>
                        {Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                            return (
                                <tr>
                                    <td>{props.userDimensionConfigurationForCompare[element]}</td>
                                    <td>{firstDimension !== undefined && firstDimension[element]}</td>
                                    <td>{secondDimension !== undefined && secondDimension[element]}</td>
                                </tr>
                            )
                        })}
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// export default CreateGoal;