import {useState} from "react";

export const useDisplayMultiSeries = (props) => {
    const [visibleElements, setVisibleElements] = useState([]);
    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };
    const handleRemoveSingleSeries = (multiIndex, singleIndex) => {

        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries[multiIndex].single_series.splice(singleIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }

    const handleRemoveMultiSeries = (multiIndex) => {
        toggleVisibility(multiIndex)
        const updatedMultiSeries = [...props.multiSeries];
        updatedMultiSeries.splice(multiIndex, 1);
        props.setMultiSeries(updatedMultiSeries);
    }
    return [visibleElements, handleRemoveSingleSeries, handleRemoveMultiSeries, toggleVisibility]
}