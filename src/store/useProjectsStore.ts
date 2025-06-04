import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type {
  NewProject,
  NewProjectService,
  Project,
  ProjectEnviroments,
  UpdateProjectName,
  UpdateProjectServices,
} from '../types/projects';

export const useProjectsStore = defineStore('projects', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const projects = ref<Project[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getProjects = async () => {
    isLoading.value = true;
    const response = await repositories.projects.getProjects();
    if (response.success) {
      projects.value = response.data as Project[];
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const createProject = async (payload: NewProject) => {
    isLoading.value = true;
    const response = await repositories.projects.createProject(payload);
    if (response.success) {
      projects.value.push(response.data as Project);
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const getProjectById = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.projects.getProjectById(id);
    if (response.success) {
      return response.data as Project;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Retrives the environments of a project by its id.
  const getProjectEnvironments = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.projects.getProjectEnvironments(id);
    if (response.success) {
      return response.data as ProjectEnviroments[];
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Assigns a service to a project by its id.
  const assignProjectServices = async (
    id: number,
    payload: NewProjectService,
  ) => {
    isLoading.value = true;
    const response = await repositories.projects.assingProjectServices(
      id,
      payload,
    );
    if (response.success) {
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Update project's name by its id.
  const updateProjectName = async (id: number, payload: UpdateProjectName) => {
    isLoading.value = true;
    const response = await repositories.projects.updateProjectName(id, payload);
    if (response.success) {
      const index = projects.value.findIndex((project) => project.id === id);
      if (index !== -1) {
        projects.value[index] = { ...projects.value[index], ...payload };
      }
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Update services assigned to a project.
  const updateProjectService = async (
    project_id: number,
    service_id: number,
    payload: UpdateProjectServices,
  ) => {
    isLoading.value = true;
    const response = await repositories.projects.updateProjectService(
      project_id,
      service_id,
      payload,
    );
    if (response.success) {
      const index = projects.value.findIndex(
        (project) => project.id === project_id,
      );
      if (index !== -1) {
        const serviceIndex = projects.value[index].services.findIndex(
          (service) => service.id === service_id,
        );
        if (serviceIndex !== -1) {
          projects.value[index].services[serviceIndex] = {
            ...projects.value[index].services[serviceIndex],
            ...payload,
          };
        }
      }
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Deletes a service from a project by its id.
  const deleteProjectService = async (id: number, service_id: number) => {
    isLoading.value = true;
    const response = await repositories.projects.deleteProjectService(
      id,
      service_id,
    );
    if (response.success) {
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  return {
    error,
    projects,
    isLoading,
    getProjects,
    createProject,
    getProjectById,
    getProjectEnvironments,
    assignProjectServices,
    updateProjectName,
    updateProjectService,
    deleteProjectService,
  };
});
