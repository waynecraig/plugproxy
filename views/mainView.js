import {
    default as React,
    Component,
    PropTypes
} from 'react';

import AppBar from 'material-ui/lib/app-bar';
import ImageFlashOn from 'material-ui/lib/svg-icons/image/flash-on';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

import ContentPane from './contentPane';
import {
    addRule,
    updateRule,
    deleteRule,
    addTarget,
    updateTarget,
    deleteTarget,
    relate
} from '../js/actions';
import { getColor } from '../js/colors';

const pageStyle = {
    position: 'relative',
    width: '50%',
    float: 'right'
}

export default class MainView extends Component {

    constructor() {
        super();
        this.state = {
            windowHeight: window.innerHeight
        };
    }

    handleResize() {
        this.setState({windowHeight: window.innerHeight});
    }

    componentDidMount() {
        window.addEventListener('resize', ()=>this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', ()=>this.handleResize());
    }

    hasRelatedRule(target) {
        return !this.props.data.rules.filter((item)=>item.target===target.id).length;
    }

    onSelectRule(rule) {
        this.setState({selectedRule: rule});
    }

    onUnselectRule() {
        this.setState({selectedRule: null});
    }

    onSelectTarget(target) {
        this.setState({selectedTarget: target});
    }

    onUnselectTarget() {
        this.setState({selectedTarget: null});
    }

    relateRule(item) {

        this._targetPane.unselectItem();

        return relate({ruleid: item.id, targetid: this.state.selectedTarget.id});
        
    }

    relateTarget(item) {

        this._rulePane.unselectItem();

        return relate({ruleid: this.state.selectedRule.id, targetid: item.id});

    }

    render() {

        const { data, refresh } = this.props;
        const { windowHeight, selectedRule, selectedTarget } = this.state;

        const headHeight = this._mainBar && this._mainBar.offsetHeight || 64;
        Object.assign(pageStyle, {height: windowHeight - headHeight + 'px'});

        return (
            <div className='mainView'>
                <AppBar 
                    title="Plugproxy Admin UI" 
                    showMenuIconButton={false}
                    ref={(ref)=>this._mainBar=ref}
                />
                <ContentPane
                    key={2}
                    zDepth={2}
                    ref={(ref)=>this._targetPane=ref}
                    list={this.props.data.targets}
                    fields={{name:'名称',url:'服务url'}}
                    style={pageStyle}
                    title='指向服务'
                    updateAction={updateTarget}
                    addAction={addTarget}
                    deleteAction={deleteTarget}
                    refreshAction={this.props.refresh}
                    canDelete={(item)=>this.hasRelatedRule(item)}
                    getColor={(item)=>getColor(item.id)}
                    onSelectItem={(item)=>this.onSelectTarget(item)}
                    onUnselectItem={()=>this.onUnselectTarget()}
                    relatingItem={selectedRule}
                    isRelated={(item)=>item.id===selectedRule.target}
                    relateAction={(item)=>this.relateTarget(item)}
                    Icon={ActionGrade}
                />
                <ContentPane
                    key={1}
                    zDepth={1}
                    ref={(ref)=>this._rulePane=ref}
                    list={data.rules}
                    fields={{name:'名称',rule:'规则(正则语法)'}}
                    style={pageStyle}
                    title='代理规则'
                    updateAction={updateRule}
                    addAction={addRule}
                    deleteAction={deleteRule}
                    refreshAction={refresh}
                    canDelete={()=>true}
                    getColor={(item)=>getColor(item.target)}
                    onSelectItem={(item)=>this.onSelectRule(item)}
                    onUnselectItem={()=>this.onUnselectRule()}
                    relatingItem={selectedTarget}
                    isRelated={(item)=>item.target===selectedTarget.id}
                    relateAction={(item)=>this.relateRule(item)}
                    Icon={ImageFlashOn}
                />
            </div>
        )
    }

}
