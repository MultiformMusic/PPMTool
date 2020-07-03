package net.multiformmusic.ppmtool.services;

import net.multiformmusic.ppmtool.domain.Project;
import net.multiformmusic.ppmtool.exceptions.ProjectIdException;
import net.multiformmusic.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {

        try {

            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);

        } catch (Exception ex) {
            throw new ProjectIdException("Project ID " + project.getProjectIdentifier() + " already exists");
        }

    }
}
