import {
    default as React,
    Component,
    PropTypes
} from 'react';

import ConfirmBtn from './confirmBtn';

import TextField from 'material-ui/lib/text-field';

const textFieldStyle = {
    marginRight: '20px'
}

export default class EditorBtn extends ConfirmBtn {

    componentWillMount() {
        const changed = {};
        if (this.props.item) {
            changed.id = this.props.item.id;
        }
        this.setState({changed:changed});
    }

    canSubmit() {

        const { item, fields } = this.props;
        const { changed } = this.state;

        const editingItem = item || {};

        const count = Object.keys(changed).filter((key)=>(
            key !== 'id' && changed[key] && changed[key] !== editingItem[key]
        )).length;

        return changed.id ? !!count : count === Object.keys(fields).length;

    }

    action() {
        this.props.action(this.state.changed);
        this.closeDialog();
        if (!this.props.item) {
            this.setState({changed: {}});
        }
    }

    getDialogContent() {

        const { fields, item } = this.props;
        const { changed } = this.state;

        const editingItem = item || {};

        return Object.keys(fields).map((key)=>{
            const value = Object.assign({}, editingItem, changed)[key];
            const onChange = (e) => {
                const input = {};
                input[key] = e.target.value;
                this.setState({
                    changed: Object.assign(changed,input)
                });
            }
            return (
                <TextField
                    key={key}
                    style={textFieldStyle}
                    value={value}
                    hintText={fields[key]}
                    onChange={onChange}
                />
            )
        });

    }

}
