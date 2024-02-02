import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {handleMovetoHome, handleMoveToScheduler} from "../../helpers/history_helpers";

const useModifyTraining = (props) => {
    const history = useHistory()
    const [visibleElements, setVisibleElements] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [removeTrainingModal, setRemoveTrainingModal] = useState(false);
    const [differentDayModal, setDifferentDayModal] = useState(false);
    const {trainingId} = props.match.params;
    useEffect(() => {
        props.getSingleTraining(trainingId)
            .then((res) => {
                setApiData(res);
            })
            .catch(() => {
                handleMovetoHome(history)
            })
    }, [trainingId])

    const handleModifyTraining = async (data) => {
        await props.updateTraining(data)
        await handleMoveToScheduler(history)
    }

    const handleDeleteTraining = async (id) => {
        await props.deleteCurrentTraining(id)
    }

    const handleModifySingleSeries = (e, values, id, multi_series_index, single_series_index, singleseries) => {
        e.preventDefault()
        props.updateSingleSeries(singleseries)
            .then(() => {
                props.getSingleTraining(trainingId)
                    .then((res) => {
                        setApiData(res);
                    })
                    .catch(() => {
                        handleMovetoHome(history)
                    })
            })
    }


    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };
    return [history, visibleElements, apiData, trainingId, removeTrainingModal, differentDayModal, setRemoveTrainingModal,
        handleModifyTraining, setDifferentDayModal, handleDeleteTraining, handleModifySingleSeries, toggleVisibility]
};

export default useModifyTraining;
