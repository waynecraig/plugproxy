import {
    default as React,
    Component,
    PropTypes
} from 'react';

import EditorBtn from './editorBtn';

import FloatingActionButton from 'material-ui/lib/floating-action-button';

const iconStyle = {
    height: '40px'
}

export default class FloatingEditorBtn extends EditorBtn {

    render() {

        const { Icon } = this.props;

        return (
            <FloatingActionButton
                onClick={()=>this.openDialog()}
                mini={true}
            >
                <Icon style={iconStyle}/>
                { this.state.open && this.getDialog() }
            </FloatingActionButton>
        );
    }

}
