import type { AxiosError } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type {
  NewProject,
  NewProjectService,
  Project,
  ProjectEnviroments,
  ProjectServices,
  UpdateProjectName,
  UpdateProjectServices,
} from '../../../types/projects';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/projects';

export interface ProjectsRequests {
  getProjects(): Promise<StandardResponse<Project[]>>;
  createProject(body: NewProject): Promise<StandardResponse<Project>>;
  getProjectById(id: number): Promise<StandardResponse<Project>>;
  getProjectEnvironments(
    id: number,
  ): Promise<StandardResponse<ProjectEnviroments[]>>;
  assingProjectServices(
    id: number,
    body: NewProjectService,
  ): Promise<StandardResponse<true>>;
  updateProject(
    id: number,
    body: UpdateProjectName,
  ): Promise<StandardResponse<Project>>;
  updateProjectService(
    project_id: number,
    service_id: number,
    body: UpdateProjectServices,
  ): Promise<StandardResponse<ProjectServices>>;
  resetRequestsServiceQuota(
    project_id: number,
    service_id: number,
    body: boolean,
  ): Promise<StandardResponse<true>>;
  deleteProject(id: number): Promise<StandardResponse<true>>;
  deleteProjectService(
    id: number,
    service_id: number,
  ): Promise<StandardResponse<true>>;
}

export default <ProjectsRequests>{
  async getProjects(): Promise<StandardResponse<Project[]>> {
    try {
      const response = await api.get<Project[]>(`${RESOURCE}`);
      // Access the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data?.map((project) => ({
        ...project,
        created_at: datetimeFormatter.format(new Date(project.created_at)),
      }));
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async createProject(body: NewProject): Promise<StandardResponse<Project>> {
    try {
      const response = await api.post<Project>(`${RESOURCE}`, body);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async getProjectById(id: number): Promise<StandardResponse<Project>> {
    try {
      const response = await api.get<Project>(`${RESOURCE}/${id}`);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      processedResponse.services = processedResponse.services.map(
        (service) => ({
          ...service,
          assigned_at: datetimeFormatter.format(new Date(service.assigned_at)),
          next_reset: datetimeFormatter.format(new Date(service.next_reset)),
        }),
      );
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Retrives the environments of a project by its id.
  async getProjectEnvironments(
    id: number,
  ): Promise<StandardResponse<ProjectEnviroments[]>> {
    try {
      const response = await api.get<ProjectEnviroments[]>(
        `${RESOURCE}/${id}/environments`,
      );
      // Access the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data?.map((project) => ({
        ...project,
        created_at: datetimeFormatter.format(new Date(project.created_at)),
      }));
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Assigns a service to a project by its id.
  async assingProjectServices(
    id: number,
    body: NewProjectService,
  ): Promise<StandardResponse<true>> {
    try {
      await api.post<true>(`${RESOURCE}/${id}/services`, body);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Update project's name by its id.
  async updateProject(
    id: number,
    body: UpdateProjectName,
  ): Promise<StandardResponse<Project>> {
    try {
      const response = await api.patch<Project>(`${RESOURCE}/${id}`, body);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      processedResponse.services = processedResponse.services.map(
        (service) => ({
          ...service,
          assigned_at: datetimeFormatter.format(new Date(service.assigned_at)),
          next_reset: datetimeFormatter.format(new Date(service.next_reset)),
        }),
      );
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Update services assigned to a project.
  async updateProjectService(
    project_id: number,
    service_id: number,
    body: UpdateProjectServices,
  ): Promise<StandardResponse<ProjectServices>> {
    try {
      const response = await api.patch<ProjectServices>(
        `${RESOURCE}/${project_id}/services/${service_id}`,
        body,
      );
      const processedResponse = response.data;
      // Access the backend response to capture 'assigned_at' and format it to local time and date.
      processedResponse.assigned_at = datetimeFormatter.format(
        new Date(processedResponse.assigned_at),
      );
      processedResponse.next_reset = datetimeFormatter.format(
        new Date(processedResponse.next_reset),
      );
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async resetRequestsServiceQuota(
    project_id: number,
    service_id: number,
    body: boolean,
  ): Promise<StandardResponse<true>> {
    try {
      await api.post<true>(
        `${RESOURCE}/${project_id}/services/${service_id}/reset-requests`,
        body,
      );
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Deletes a service from a project by its id.
  async deleteProjectService(
    id: number,
    service_id: number,
  ): Promise<StandardResponse<true>> {
    try {
      await api.delete<true>(`${RESOURCE}/${id}/services/${service_id}`);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Deletes a project by its id.
  async deleteProject(id: number): Promise<StandardResponse<true>> {
    try {
      await api.delete<true>(`${RESOURCE}/${id}`);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },
};
