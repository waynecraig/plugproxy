import {
    default as React,
    Component,
    PropTypes
} from 'react';

import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import { indigo500, grey400 } from 'material-ui/lib/styles/colors';

import ConfirmBtn from './confirmBtn';
import EditorBtn from './editorBtn';
import FloatingEditorBtn from './floatingEditorBtn';

const bottomBarStyle = {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    backgroundColor: indigo500 
}

const listStyle = {
    overflowY: 'auto'
}

const listItemBtnStyle = {
    float: 'right'
}

export default class ContentPane extends Component {

    constructor() {
        super();
        this.state = {
            selectedItem: null,
            relatingItem: null
        }
    }

    deleteItem(item) {
        this.props.deleteAction(item)
            .then(this.props.refreshAction)
            .catch((e)=>alert(e));
    }

    saveItem(item) {
        if (item.id) {
            this.props.updateAction(item)
                .then(this.props.refreshAction)
                .catch((e)=>alert(e));
        } else {
            this.props.addAction(item)
                .then(this.props.refreshAction)
                .catch((e)=>alert(e));
        }
    }

    selectItem(item) {
        this.props.onSelectItem(item);
        this.setState({selectedItem: item});
    }

    unselectItem() {
        this.props.onUnselectItem();
        this.setState({selectedItem: null});
    }

    relateItem(item) {
        this.props.relateAction(item)
            .then(this.props.refreshAction)
            .catch((e)=>alert(e));
    }

    getItemBtns(item) {

        const { title, fields, getColor, canDelete, relatingItem, isRelated } = this.props;
        const { selectedItem} = this.state;

        const btns = [];

        if (relatingItem) {
            if (!isRelated(item)) {
                btns.push(
                    <FlatButton
                        key='relate'
                        label='关联'
                        style={listItemBtnStyle}
                        onClick={()=>this.relateItem(item)}
                    />
                );
            }
        } else if (selectedItem) {
            if (selectedItem === item) {
                btns.push(
                    <FlatButton
                        key='unselect'
                        label='取消选择'
                        style={listItemBtnStyle}
                        onClick={()=>this.unselectItem(item)}
                    />
                );
            }
        } else {
            btns.splice(0, 0, 
                <FlatButton
                    key='select'
                    label='选择'
                    style={listItemBtnStyle}
                    onClick={()=>this.selectItem(item)}
                />,
                <EditorBtn
                    key='edit'
                    btnText="编辑"
                    btnStyle={listItemBtnStyle}
                    action={(item)=>{this.saveItem(item)}}
                    title={'编辑'+title}
                    fields={fields}
                    item={item}
                />
            );
            if (canDelete(item)) {
                btns.push(
                    <ConfirmBtn
                        key='delete'
                        btnText="删除"
                        btnStyle={listItemBtnStyle}
                        title={"确认要删除"+item.name+"吗？"}
                        action={()=>{this.deleteItem(item)}}
                    />
                );
            }
        }

        return btns;

    }

    getItemStyle(item) {

        const { getColor, relatingItem, isRelated } = this.props;
        const { selectedItem } = this.state;

        const style = {};

        if (selectedItem) {
            if (selectedItem !== item) {
                style.backgroundColor = grey400;
                style.opacity = 0.5;
            } else {
                style.backgroundColor = getColor(item);
            }
        } else {
            style.backgroundColor = getColor(item);
            if (relatingItem && !isRelated(item)) {
                style.opacity = 0.8;
            }
        }

        return style;

    }

    render() {

        const tailHeight = this._tailBar && this._tailBar.offsetHeight || 64;
        Object.assign(listStyle, {
            height: +this.props.style.height.replace('px','') - tailHeight + 'px'
        });

        const { zDepth, style, list, fields, getColor, title, canDelete, Icon } = this.props;
        const { selectedItem } = this.state;

        return (
            <Paper zDepth={zDepth} style={style}>
                <List style={listStyle}>
                    {list.map((item)=>(
                        <ListItem 
                            key={item.id}
                            primaryText={item[Object.keys(fields)[0]]}
                            secondaryText={item[Object.keys(fields)[1]]}
                            leftIcon={<Icon/>}
                            style={this.getItemStyle(item)}
                        >
                            { this.getItemBtns(item) }
                        </ListItem>
                    ))}
                </List>
                <AppBar 
                    title={title}
                    style={bottomBarStyle}
                    ref={(ref)=>this._tailBar=ref}
                    iconElementLeft={<Icon/>}
                    iconElementRight={(
                        <FloatingEditorBtn
                            action={(item)=>{this.saveItem(item)}}
                            title={'新建'+title}
                            fields={fields}
                            Icon={ContentAdd}
                        />
                    )}
                />
            </Paper>
        )
    }

}
