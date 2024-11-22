import {Sale} from './sale';
import {Lease} from './lease';

export interface ClientDetails {
  name: string
  firsName: string
  email: string
  city: string
  postalCode: string
  street: string
  country: string
  numberH: string
  sales: Sale[]
  leases: Lease[]
}
