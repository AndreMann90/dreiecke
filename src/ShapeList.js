import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteItem, deleteAllItems } from './redux/itemList'

import {numToStr} from './util'

import { Table, Button, Checkbox } from 'react-bootstrap';

const checkBoxStyle = {
    textAlign: 'center',
    verticalAlign: 'middle'
};

const centerStyle = {
    display: 'block',
    margin: 'auto'
};

class ShapeListView extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items; // thanks to immutable list
    }

    render() {
        return (
            <div>
                <Table striped hover>
                    <thead>
                    <tr>
                        {!this.props.selectable
                            ? null
                            : <th/>
                        }
                        <th>Fl.Nr.</th>
                        <th>Form</th>
                        <th>Formel</th>
                        <th>Fläche</th>
                        {!this.props.deletable
                            ? null
                            : <th><DeleteAll items={this.props.items} onDeleteAll={this.props.onDeleteAll.bind(this)} /></th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(item =>
                            (<TriangleRow key={item.id} item={item}
                                          deletable={this.props.deletable} onDelete={this.props.onDelete.bind(this)}
                                          selectable={this.props.selectable} onSelect={this.props.onSelect.bind(this)}/>)
                        )}
                    </tbody>
                </Table>
                <p><strong>Gesamt: {numToStr(this.props.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0))}</strong></p>
            </div>
        );
    }
}

class TriangleRow extends Component {
    render() {
        return (
            <tr>
                {!this.props.selectable
                    ? null
                    : <td style={checkBoxStyle}>
                        <Checkbox style={centerStyle} checked={this.props.item.isChecked} onChange={this.handleSelect.bind(this)}/>
                    </td>
                }
                <td>{this.props.item.areaNumber}</td>
                <td>{this.props.item.shape}</td>
                <td>{this.props.item.formula}</td>
                <td>{this.props.item.areaStr}</td>
                {!this.props.deletable
                    ? null
                    : <td><Button bsStyle="link" bsSize="xsmall" onClick={this.handleDelete.bind(this)}>Löschen</Button></td>
                }
            </tr>
        )
    }

    handleDelete() {
        this.props.onDelete(this.props.item);
    }

    handleSelect() {
        this.props.onSelect(this.props.item);
    }
}

function DeleteAll(props) {
    if (props.items.size > 0) {
        return <Button bsStyle="link" bsSize="xsmall" onClick={props.onDeleteAll.bind(this)}>Alle löschen</Button>;
    } else {
        return <div />
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.present.items,
        allItemsSelected: true,//state.present.items.every(item => item.selected === true), // TODO use reselect
        deletable: ownProps.deletable,
        selectable: ownProps.selectable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (item) => {
            dispatch(deleteItem(item))
        },
        onDeleteAll: () => {
            dispatch(deleteAllItems())
        },
        onSelect: (item) => {
            console.log(item);
            //TODO
        },
        onSelectAll: () => {
            console.log('selectall');
            //TODO
        }
    }
};

const ShapeList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeList