export interface ILoja {
  id?: any;
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
  id_auth?: string;
  id_store?: number;
}