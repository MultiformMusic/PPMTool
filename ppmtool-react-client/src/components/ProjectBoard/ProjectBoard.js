import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Backlog from './Backlog';
import { getBacklog } from '../../actions/backlogActions';

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const { id } = this.props.match.params;

        this.props.getBacklog(id);
    }

    render() {

        const { id } = this.props.match.params;
        const { project_tasks } = this.props.backlog;

        return (
        <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />


            <Backlog project_tasks={project_tasks} />
           
        </div>
        )
    }
}

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog 
});

export default connect(mapStateToProps, {getBacklog}) (ProjectBoard);
