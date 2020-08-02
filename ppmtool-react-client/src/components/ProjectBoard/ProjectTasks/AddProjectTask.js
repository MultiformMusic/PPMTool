import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addProjectTask } from '../../../actions/backlogActions';
import { PropTypes } from 'prop-types';
import { convertDateToBase } from '../../../utils/utils';

class AddProjectTask extends Component {

    constructor(props) {

        super(props);

        const { id } = props.match.params;

        this.state = {
            summary: '',
            acceptanceCriteria: '',
            status: '',
            priority: '0',
            dueDate: '',
            projectIdentifier: id,
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = event => {

        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = event => {

        event.preventDefault();

        const newTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: convertDateToBase(this.state.dueDate)
        }

        //console.log("newTask = " + newTask);

        this.props.addProjectTask(this.state.projectIdentifier, newTask, this.props.history);
    }

    render() {

        const { id } = this.props.match.params;
        const { errors } = this.state;

        return (

        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${id}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Add /Update Project Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input onChange={this.onChange} value={this.state.summary} type="text" className={ classnames("form-control form-control-lg", {
                                    "is-invalid": errors.summary
                                })} name="summary" placeholder="Project Task summary" />
                                {
                                    errors.summary && (
                                        <div className="invalid-feedback">
                                            {errors.summary }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <textarea onChange={this.onChange} value={this.state.acceptanceCriteria} className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input onChange={this.onChange} value={this.state.dueDate} type="date" className="form-control form-control-lg" name="dueDate" />
                            </div>
                            <div className="form-group">
                                <select onChange={this.onChange} value={this.state.priority} className="form-control form-control-lg" name="priority">
                                    <option value={0}>Select Priority</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                            </div>
    
                            <div className="form-group">
                                <select onChange={this.onChange} value={this.state.status} className="form-control form-control-lg" name="status">
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

AddProjectTask.protoTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapstateToProps = state => ({
    errors: state.errors
})

export default connect(mapstateToProps, {addProjectTask}) (AddProjectTask);
