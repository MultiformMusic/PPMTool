package net.multiformmusic.ppmtool.services;

import net.multiformmusic.ppmtool.domain.Backlog;
import net.multiformmusic.ppmtool.domain.Project;
import net.multiformmusic.ppmtool.domain.ProjectTask;
import net.multiformmusic.ppmtool.exceptions.ProjectNotFoundException;
import net.multiformmusic.ppmtool.repositories.BacklogRepository;
import net.multiformmusic.ppmtool.repositories.ProjectRepository;
import net.multiformmusic.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    ProjectTaskRepository projectTaskRepository;

    @Autowired
    ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {

            Backlog backlog = backlogRepository.findByProjectIdentifier((projectIdentifier));
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            // low priority
            if (projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }


    }

    public Iterable<ProjectTask> findBacklogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);
        if (project == null) {
            throw new ProjectNotFoundException("Project with id " + id + " doest not exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
