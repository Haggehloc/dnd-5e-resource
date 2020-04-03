import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getMonster} from "../../actions/SearchActions";
import {addMonsterToState} from "../../actions/MonsterActions";


export class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getMonster();
        this.props.addMonsterToState();

    }

    onChange = (e) => {
        this.props.addMonsterToState(e.target.value);
    };

    onClick = (e) => {
        console.log(e.target.value);
        this.props.getMonster(e.target.value);
    };

    renderMonster = () => {
        return  this.props.monster.monsterView.msg;
    };

    render() {

        return (
            <div className='wrapper'>
                <div className="md-form active-cyan-2 mb-3">
                    <p className="text-center">This is a lookup for monsters in dnd 5e. Enter the monster you would like to get the stats for. If you would like you could also add the monster to your favorites with the provided button.</p>
                    <div className='field-entry'>
                        <input type='text'
                               className='form-control' placeholder="Please enter the monster you would like to search for here."
                               id='monster-input' value={this.props.monster.monster}
                               onChange={this.onChange}/>
                    </div>
                    <div className='button-container'>
                        <button type='button' className='btn btn-primary add-button'
                                value={this.props.monster.monster}
                                onClick={this.onClick}>Get Monster Data
                        </button>
                    </div>
                    <div className='field-container entered-items panel panel-default overflow-auto m-3' id='monster-container'>
                        {this.renderMonster()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    monster: state.monster,
    monsterView: state.monsterView
});

Homepage.propTypes = {
    getMonster: PropTypes.func.isRequired,
    addMonsterToState: PropTypes.func.isRequired,
    monster: PropTypes.string,
    monsterView: PropTypes.object
};


export default connect(
    mapStateToProps,
    {getMonster, addMonsterToState}
)(Homepage);
