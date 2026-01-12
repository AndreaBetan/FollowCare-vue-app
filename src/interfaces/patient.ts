import { Name, Location, Login, Dob, ID, Picture } from './patient-response';

export interface Pacient {
    gender:     string;
    name:       Name;
    location:   Location;
    email:      string;
    dob:        Dob;
    registered: Dob;
    phone:      string;
    cell:       string;
    id:         ID;
    picture:    Picture;
    nat:        string;
}

export type PatientFilter =
  | 'cardiovascular-risk'
  | 'fertile-women'
  | 'pending-exams'
  | 'all'
