export enum Job {
  KERTESZ = 'KERTESZ',
  HENTES = 'HENTES',
  PEK = 'PEK'
}

export const JOB_LABELS: Record<Job, string> = {
  [Job.KERTESZ]: 'Kertész',
  [Job.HENTES]: 'Hentes',
  [Job.PEK]: 'Pék'
};

interface BaseUserDto {
  firstname: string;
  lastname: string;
  address: string;
  telephone: string;
  job: Job;
}

export interface User extends BaseUserDto {
  id?: number;
  active: boolean;
}

export interface CreateUserDto extends BaseUserDto {
}

export interface UpdateUserDto extends CreateUserDto {
  active: boolean;
}
