import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MenuItem, Select} from "@material-ui/core";

export function CompareDimensions(props) {
    const [userConfig, setUserConfig] = useState(props.userDimensionConfiguration)
    useEffect(()=>{
        console.log("przed")
        let temp_userConfig = props.userDimensionConfiguration
        console.log(temp_userConfig)
        delete temp_userConfig.id
        setUserConfig(temp_userConfig)
    },[props.userDimensionConfiguration])
    console.log("userConfig")
    console.log(userConfig)
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
                                <Select>
                                    {Object.values(props.userDimensions).map(el => {
                                        return (
                                            <MenuItem value={el.id}>{el.date}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </th>
                            <th>
                                <Select>
                                    {Object.values(props.userDimensions).map(el => {
                                        return (
                                            <MenuItem value={el.id}>{el.date}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </th>
                        </tr>
                        <tr>
                            <td>Sample text</td>
                            <td>TEst</td>
                            <td>TEst</td>
                        </tr>
                        <tr>
                            <td>Sample text</td>
                            <td>TEst2</td>
                            <td>TEst2</td>
                        </tr>
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