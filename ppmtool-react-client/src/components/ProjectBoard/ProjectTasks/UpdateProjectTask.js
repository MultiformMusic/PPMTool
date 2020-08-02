
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTask } from '../../../actions/backlogActions';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { convertDateToBase, convertDateFromBase } from '../../../utils/utils';

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            projectSequence: "",
            summary: "test",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            create_At: "",
            errors: {}
        }
    }

    componentDidMount() {

        const {backlog_id, pt_id} = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        
        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At            
        } = nextProps.project_task;

        this.setState({            
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate: convertDateFromBase(dueDate),
            projectIdentifier,
            create_At: convertDateFromBase(create_At) });
    }

    onChange = event => {

        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = event => {

        event.preventDefault();

        const updatedProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: convertDateToBase(this.state.dueDate),
            projectIdentifier: this.state.projectIdentifier,
            create_At: convertDateToBase(this.state.create_At)
        }


        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updatedProjectTask, this.props.history);
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-light">
                                Back to Project Boa
                            </Link>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectIdentifier} | Project Task ID: { this.state.projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        onChange={this.onChange} 
                                        value={this.state.summary} 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {'is-invalid': errors.summary} )}
                                        name="summary" 
                                        placeholder="Project Task summary" />
                                    {
                                        errors.summary &&
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        onChange={this.onChange}  
                                        value={this.state.acceptanceCriteria} 
                                        className="form-control form-control-lg" 
                                        placeholder="Acceptance Criteria" 
                                        name="acceptanceCriteria">                                        
                                    </textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input onChange={this.onChange}  value={this.state.dueDate} type="date" className="form-control form-control-lg" name="dueDate" />
                                </div>
                                <div className="form-group">
                                    <select onChange={this.onChange}  value={this.state.priority} className="form-control form-control-lg" name="priority">
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
        
                                <div className="form-group">
                                    <select onChange={this.onChange}  value={this.state.status} className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
        
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
})

export default connect(mapStateToProps, {getProjectTask, updateProjectTask}) (UpdateProjectTask);