import React, { Component } from 'react';

import { Table, Button, Glyphicon } from 'react-bootstrap';

export default class ShapeListView extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items; // thanks to immutable list
    }

    render() {
        return (
            <div>
                <Table striped>
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
                            (<TriangleRow key={item.id} item={item} isChecked={this.props.itemSelectedFcn(item)}
                                          deletable={this.props.deletable} onDelete={this.props.onDelete.bind(this)}
                                          selectable={this.props.selectable} onSelect={this.props.onSelect.bind(this)}/>)
                        )}
                    </tbody>
                </Table>
                <p><strong>Gesamt: {this.props.overallArea}</strong></p>
            </div>
        );
    }
}

ShapeListView.defaultProps = {
    deletable: false,
    selectable: false,
    itemSelectedFcn: () => false,
    onSelect: () => {},
    onDelete: () => {},
    onDeleteAll: () => {}
};

class TriangleRow extends Component {

    checked = <td><Button bsStyle="danger" bsSize="xsmall" onClick={this.handleSelect.bind(this)}><Glyphicon glyph="minus"/></Button></td>;
    notChecked = <td><Button bsStyle="success" bsSize="xsmall" onClick={this.handleSelect.bind(this)}><Glyphicon glyph="plus"/></Button></td>;

    render() {
        let selectTableData = null;
        if(this.props.selectable) {
            selectTableData = this.props.isChecked ? this.checked : this.notChecked
        }
        return (
            <tr>
                {selectTableData}
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