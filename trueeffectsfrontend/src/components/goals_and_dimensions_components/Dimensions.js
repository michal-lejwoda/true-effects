import React, {useState} from 'react';
import {CreateDimension} from "../goals_and_measurements_modals/CreateDimension";
import {CompareDimensions} from "../goals_and_measurements_modals/CompareDimensions";

export const Dimensions = () => {
    const [showCreateDimension, setShowCreateDimension] = useState(false);
    const [showCompareDimensions, setShowCompareDimensions] = useState(false);
    const handleShowCreateDimension = () => setShowCreateDimension(true);
    const handleShowCompareDimensions = () => setShowCompareDimensions(true);
    const handleCloseCreateDimension = () => setShowCreateDimension(false);
    const handleCloseCompareDimensions = () => setShowCompareDimensions(false);


    return (
        <div>
            <h1>Dimensions</h1>
            <button onClick={handleShowCreateDimension}>+ Dodaj nowy pomiar</button>
            <button onClick={handleShowCompareDimensions}>+ Porównaj Pomiary</button>
            <CreateDimension show={showCreateDimension} handleClose={handleCloseCreateDimension}
                             handleShow={handleShowCreateDimension}/>
            <CompareDimensions show={showCompareDimensions} handleClose={handleCloseCompareDimensions}
                               handleShow={handleShowCompareDimensions}/>
        </div>
    );
};
