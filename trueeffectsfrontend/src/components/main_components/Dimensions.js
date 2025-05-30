import React, {useState} from 'react';
import {CreateDimension} from "../goals_and_measurements_modals/CreateDimension";
import {CompareDimensions} from "../goals_and_measurements_modals/CompareDimensions";
import {connect} from "react-redux";
import {getDimensions, postDimension, putDimension} from "../../redux/actions/trainingActions";
import "../../new_sass/main.scss"
import "../../new_sass/dimensions.scss"
import {BoxLoading} from "react-loadingg";
import {ModifyDimension} from "../goals_and_measurements_modals/ModifyDimension";
import {useTranslation} from "react-i18next";

const Dimensions = (props) => {
    const {t} = useTranslation();
    const [showCreateDimension, setShowCreateDimension] = useState(false);
    const [showCompareDimensions, setShowCompareDimensions] = useState(false);
    const [showModifyDimension, setShowModifyDimension] = useState(false);
    const handleShowCreateDimension = () => setShowCreateDimension(true);
    const handleShowCompareDimensions = () => setShowCompareDimensions(true);
    const handleShowModifyDimension = () => setShowModifyDimension(true)
    const handleCloseModifyDimension = () => setShowModifyDimension(false);
    const handleCloseCreateDimension = () => setShowCreateDimension(false);
    const handleCloseCompareDimensions = () => setShowCompareDimensions(false);

    return props.userDimensionsLoaded && props.userDimensionConfigurationForCompareLoaded ? (
        <div className="dimensions">
            <div className="dimensions--last-dimension">
                <h1 className="title dimensions__title">{t("Last body measurement")}</h1>
                <div className="dimensions__buttons">
                    <button className="standard-button dimensions__buttons__create"
                            onClick={handleShowCreateDimension}>
                        {t("Add new measurement")}
                    </button>
                    <button className="standard-button dimensions__buttons__create"
                            onClick={handleShowModifyDimension}>
                        {t("Modify measurement")}
                    </button>
                    <button className="standard-button dimensions__buttons__compare"
                            onClick={handleShowCompareDimensions}>
                        {t("Compare measurements")}
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
                                        value={props.userDimensions[0][element]}
                                        type="text" disabled={true}/>
                                    <span>{props.userDimensionConfigurationForCompare[element]}</span>
                                </div>
                            </div>
                        )
                    }) : <p>{t("You don't have any measurements yet")}</p>}
                {(props.userDimensionConfigurationLoaded && props.userDimensionsForCreateLoaded) &&
                    <CreateDimension show={showCreateDimension} handleClose={handleCloseCreateDimension}
                                     handleShow={handleShowCreateDimension}
                                     getDimensions={props.getDimensions}
                                     userDimensionConfiguration={props.userDimensionConfiguration}
                                     userDimensionsForCreate={props.userDimensionsForCreate}
                                     userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                                     userDimensions={props.userDimensions}
                                     postDimension={props.postDimension}
                    />}
                {(props.userDimensionConfigurationLoaded && props.userDimensionsForCreateLoaded) &&
                    <ModifyDimension show={showModifyDimension} handleClose={handleCloseModifyDimension}
                                     handleShow={handleShowModifyDimension}
                                     getDimensions={props.getDimensions}
                                     userDimensionConfiguration={props.userDimensionConfiguration}
                                     userDimensionsForCreate={props.userDimensionsForCreate}
                                     userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                                     userDimensions={props.userDimensions}
                                     putDimension={props.putDimension}
                    />}
                {props.userDimensionConfigurationLoaded &&
                    <CompareDimensions show={showCompareDimensions} handleClose={handleCloseCompareDimensions}
                                       handleShow={handleShowCompareDimensions}
                                       userDimensions={props.userDimensions}
                                       userDimensionConfiguration={props.userDimensionConfiguration}
                                       userDimensionConfigurationForCompare={props.userDimensionConfigurationForCompare}
                    />}
            </div>
        </div>
    ) : (
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
export default connect(mapStateToProps, {postDimension, getDimensions, putDimension})(Dimensions);