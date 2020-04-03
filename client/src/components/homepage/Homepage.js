import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {getMonster, getFavorites, saveToFavorites} from "../../actions/SearchActions";
import {addMonsterToState} from "../../actions/MonsterActions";


export class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getFavorites();
    }

    onChange = (e) => {
        if(e.target.value === undefined){
            return;
        }
        this.props.addMonsterToState(e.target.value);
    };

    onClick = (e) => {
        this.props.getMonster(e.target.value.toLowerCase().replace(/ /g, "-"));
    };

    onClickSave = (e) => {
        this.props.saveToFavorites(e.target.value.toLowerCase().replace(/ /g, "-"));
    };

    onClickFavorites = (e) => {
        this.props.addMonsterToState(e.target.value);
        this.props.getMonster(e.target.value.toLowerCase().replace(/ /g, "-"));
    };

    renderMonster = () => {
        var object = (this.props.monster.monsterView.msg !== undefined ) ? JSON.parse(this.props.monster.monsterView.msg) : "";

        if(object.hasOwnProperty('error')){
            return <div className="alert alert-danger">No monster found</div>
        }

        if(object !== "" && object !== null && object !== undefined){
            var monsterName = "";
            return <div className='statContainer list-group'><ul className='d-inline-block m-2'> {Object.entries(object).map(
                key => {
                    switch(key[0]){
                        case 'name':
                            monsterName = key[1];
                            return <li className='d-block m-2 list-group-item-muted h1'>{key[1]}</li>;
                        case 'armorClass':
                        case 'size':
                        case 'alignment':
                            return <li className='d-block m-2 list-group-item-muted'>{key[0]+ ": " +  key[1]}</li>;
                        case 'hit_points':
                            return <li className='d-block m-2 list-group-item-muted'>{"HP: " +  key[1]}</li>;
                        default:
                    }
                }
            )}  </ul>
                <button type='button' className='btn btn-dark add-button'
                        value={this.props.monster.monster}
                        onClick={this.onClickSave}>Save to favorites
                </button>
            </div>;
        }
        else{
            return <div className='d-inline-block m-2'></div>;
        }

    };

    renderFavorites = () => {
        return Object.entries(this.props.monster.favorites).map(
            array => {
                return Object.entries(array[1]).map(
                    key => {
                        return <button onClick={this.onClickFavorites} value={key[1].name} className='d-block m-2 bg-primary'>{key[1].name}</button>;
                    }
                )
            }
        );
    };

    render() {

        return (
            <div className='wrapper'>
                <div className="sidenav">
                    <text>Favorites</text>
                    {this.renderFavorites()}
                </div>
                <div className="md-form active-cyan-2 mb-3">
                    <p className="text-center">This is a lookup for monsters in dnd 5e. Enter the monster you would like to get the stats for. If you would like you could also add the monster to your favorites with the provided button.</p>
                    <p className="text-center">Example monsters: Kobold, Aboleth, Adult Black Dragon</p>
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
    monsterView: state.monsterView,
    favorites: state.favorites
});

Homepage.propTypes = {
    getMonster: PropTypes.func.isRequired,
    addMonsterToState: PropTypes.func.isRequired,
    saveToFavorites: PropTypes.func.isRequired,
    getFavorites: PropTypes.func.isRequired,
    monster: PropTypes.object,
    monsterView: PropTypes.object,
    favorites: PropTypes.object
};


export default connect(
    mapStateToProps,
    {getMonster, addMonsterToState, getFavorites, saveToFavorites}
)(Homepage);
