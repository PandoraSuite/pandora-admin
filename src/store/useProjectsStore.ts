import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type {
  NewProject,
  NewProjectService,
  Project,
  ProjectEnviroments,
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
    deleteProjectService,
  };
});
