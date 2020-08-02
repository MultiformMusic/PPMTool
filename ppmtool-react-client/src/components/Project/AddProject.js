import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';
import classnames from 'classnames';
import { convertDateToBase } from '../../utils/utils';

class AddProject extends Component {


    constructor(props) {
        super(props);

        this.state = {
            description: "",
            projectName: "",
            projectIdentifier: "",
            start_date: "",
            end_date: "",
            errors: {}
        }
    }

    /*componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }*/

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors !== prevState.errors){
          return { errors: nextProps.errors};
       }
       else return null;
     }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = event => {

        event.preventDefault();

        const newProject = {
            description: this.state.description,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            start_date: convertDateToBase(this.state.start_date),
            end_date: convertDateToBase(this.state.end_date)
        }

        //console.log(newProject);

        this.props.createProject(newProject, this.props.history);
    }

    render() {

        const {errors} = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        name="projectName" 
                                        value={this.state.projectName}
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.projectName})}
                                        placeholder="Project Name" 
                                        onChange={this.onChange}/>
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
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.projectIdentifier})}
                                        placeholder="Unique Project ID"
                                        onChange={this.onChange}/>
                                    {
                                        errors.projectIdentifier && (
                                            <div className="invalid-feedback">
                                                {errors.projectIdentifier}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        name="description" 
                                        value={this.state.description}
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.description})}
                                        placeholder="Project Description"
                                        onChange={this.onChange}>
                                        
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
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="start_date" 
                                        value={this.state.start_date}
                                        onChange={this.onChange}
                                        />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="end_date" 
                                        value={this.state.end_date}
                                        onChange={this.onChange}
                                        />
                                </div>
        
                                <input 
                                    type="submit" 
                                    className="btn btn-primary btn-block mt-4" 
                                    />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createProject})(AddProject);