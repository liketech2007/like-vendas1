export interface ILoja {
  email: string;
  password: string;
  name: string;
  address?: string;
  number?: string;
  logo?: string;
  service_start_date: Date;
  end_service_date: Date;
  time_open?: string;
  time_close?: string;
}