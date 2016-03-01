import {
    default as React,
    Component,
    PropTypes
} from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class ConfirmBtn extends Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    getActionBtns() {

        const { action } = this.props;

        return [
            <FlatButton
                label='确定'
                primary={true}
                onClick={()=>this.action()}
                disabled={!this.canSubmit()}
            />,
            <FlatButton
                label='取消'
                secondary={true}
                onClick={()=>this.closeDialog()}
            />
        ];

    }

    canSubmit() {
        return true;
    }

    action() {
        this.props.action();
        this.closeDialog();
    }

    openDialog() {
        this.setState({open:true})
    }

    closeDialog() {
        this.setState({open:false})
    }

    getDialog() {
        return (
            <Dialog
                title={this.props.title}
                modal={true}
                open={this.state.open}
                actions={this.getActionBtns()}
            >
                { this.getDialogContent && this.getDialogContent() }
            </Dialog>
        );
    }

    render() {

        const { btnText, btnStyle } = this.props;

        return (
            <FlatButton 
                label={btnText} 
                style={btnStyle}
                onClick={()=>this.openDialog()}
            >
                { this.state.open && this.getDialog() }
            </FlatButton>
        );

    }

}
