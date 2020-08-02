import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getProject, createProject } from '../../actions/projectActions';
import { convertDateFromBase, convertDateToBase } from '../../utils/utils';

class UpdateProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
            
        }
    }

    componentDidMount() {

        const {id} = this.props.match.params;
        this.props.getProject(id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        const {id, projectName, projectIdentifier, description, start_date, end_date} = nextProps.project;

        this.setState({id, projectName, projectIdentifier, description, start_date: convertDateFromBase(start_date), end_date: convertDateFromBase(end_date)});
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {

        const {id, projectName, projectIdentifier, description, start_date, end_date} = nextProps.project;

        return {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        }

    }*/

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    onSubmit = event => {

        event.preventDefault();

        const updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: convertDateToBase(this.state.start_date),
            end_date: convertDateToBase(this.state.end_date)
        }


        this.props.createProject(updateProject, this.props.history);
    }

    render() {

        const {errors} = this.state;
        console.log(this.state)
        
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.onChange}
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.projectName})} 
                                        placeholder="Project Name" />
                                    {
                                        errors.projectName && (
                                            <div className="invalid-feedback">
                                                {errors.projectName}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChange}
                                        type="text" 
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        disabled />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.description})}
                                        placeholder="Project Description">                                           
                                    </textarea>
                                    {
                                        errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        )
                                    }
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input 
                                        value={this.state.start_date}
                                        type="date" 
                                        onChange={this.onChange}
                                        className="form-control form-control-lg" 
                                        name="start_date" />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input 
                                        value={this.state.end_date}
                                        type="date" 
                                        onChange={this.onChange}
                                        className="form-control form-control-lg" 
                                        name="end_date" />
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

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
})


export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);