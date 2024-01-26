import React, {useState} from 'react';
import {CreateDimension} from "../goals_and_measurements_modals/CreateDimension";
import {CompareDimensions} from "../goals_and_measurements_modals/CompareDimensions";
import {connect} from "react-redux";
import {getDimensions, postDimension} from "../../redux/actions/trainingActions";
import "../../new_sass/main.scss"
import "../../new_sass/dimensions.scss"
import {BoxLoading} from "react-loadingg";

const Dimensions = (props) => {
    const [showCreateDimension, setShowCreateDimension] = useState(false);
    const [showCompareDimensions, setShowCompareDimensions] = useState(false);
    const handleShowCreateDimension = () => setShowCreateDimension(true);
    const handleShowCompareDimensions = () => setShowCompareDimensions(true);
    const handleCloseCreateDimension = () => setShowCreateDimension(false);
    const handleCloseCompareDimensions = () => setShowCompareDimensions(false);

    return props.userDimensionsLoaded && props.userDimensionConfigurationForCompareLoaded ? (
        <div className="dimensions">
            <div className="dimensions--last-dimension">
                <h1 className="title dimensions__title">Ostatni pomiar</h1>
                <div className="dimensions__buttons">
                    <button className="standard-button dimensions__buttons__create"
                            onClick={handleShowCreateDimension}>+
                        Dodaj nowy pomiar
                    </button>
                    <button className="standard-button dimensions__buttons__compare"
                            onClick={handleShowCompareDimensions}>+
                        Porównaj Pomiary
                    </button>
                </div>
                {props.userDimensions.length > 0 &&
                    <div className="dimensions__date">
                        <input disabled={true} value={props.userDimensions[0].date} type="text"/>
                    </div>}

                {props.userDimensions.length > 0 ?
                    Object.keys(props.userDimensionConfigurationForCompare).map(element => {
                        return (
                            <div key={element}>
                                <div className="animatedInput">
                                    <input
                                        defaultValue={props.userDimensions[0][element]}
                                        type="text" disabled={true}/>
                                    <span>{props.userDimensionConfigurationForCompare[element]}</span>
                                </div>
                            </div>
                        )
                    }) : <p>Nie masz jeszcze żadnych pomiarów</p>}
                {(props.userDimensionConfigurationLoaded && props.userDimensionsForCreateLoaded) && <CreateDimension show={showCreateDimension} handleClose={handleCloseCreateDimension}
                                 handleShow={handleShowCreateDimension}
                                 getDimensions={props.getDimensions}
                                 userDimensionConfiguration={props.userDimensionConfiguration}
                                 userDimensionsForCreate={props.userDimensionsForCreate}
                                 userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                                 userDimensions={props.userDimensions}
                                 postDimension={props.postDimension}
                />}
                {props.userDimensionConfigurationLoaded && <CompareDimensions show={showCompareDimensions} handleClose={handleCloseCompareDimensions}
                                   handleShow={handleShowCompareDimensions}
                                   userDimensions={props.userDimensions}
                                   userDimensionConfiguration={props.userDimensionConfiguration}
                                   userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                />}
            </div>
        </div>
    ) : (props.userDimensionsLoading || props.userDimensionConfigurationForCompareLoading) && (
        <div className="box-loading">
            <BoxLoading/>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userDimensionConfiguration: state.training.userDimensionConfiguration,
        userDimensionConfigurationLoading: state.training.userDimensionConfigurationLoading,
        userDimensionConfigurationLoaded: state.training.userDimensionConfigurationLoaded,
        userDimensions: state.training.userDimensions,
        userDimensionsLoading: state.training.userDimensionsLoading,
        userDimensionsLoaded: state.training.userDimensionsLoaded,
        userDimensionsForCreate: state.training.userDimensionsForCreate,
        userDimensionsForCreateLoading: state.training.userDimensionsForCreateLoading,
        userDimensionsForCreateLoaded: state.training.userDimensionsForCreateLoaded,
        userDimensionConfigurationForCompare: state.training.userDimensionConfigurationForCompare,
        userDimensionConfigurationForCompareLoading: state.training.userDimensionConfigurationForCompareLoading,
        userDimensionConfigurationForCompareLoaded: state.training.userDimensionConfigurationForCompareLoaded
    }
}
export default connect(mapStateToProps, {postDimension, getDimensions})(Dimensions);