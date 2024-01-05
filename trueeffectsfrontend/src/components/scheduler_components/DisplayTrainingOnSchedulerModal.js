import React from 'react';
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

const DisplayTrainingOnSchedulerModal = () => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<div className="createdimension__elements">*/}
                        {/*    <DatePicker locale='pl'*/}
                        {/*                placeholderText={"Wybierz date"}*/}
                        {/*                dateFormat='dd/MM/yyyy'*/}
                        {/*                selected={jsDate}*/}
                        {/*                onChange={(date) => handleDateForDimensions(date)}*/}
                        {/*    />*/}
                        {/*    */}
                        {/*</div>*/}

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit">Save</button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default DisplayTrainingOnSchedulerModal;
