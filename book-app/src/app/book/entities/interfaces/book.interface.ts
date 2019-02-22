import { Entity } from './entity.interface';

export interface Earth extends Entity {
    createdDate?: Date,
    alarm: string;
    note: string;
    resistance: number;
    standard: string;
    name: string;

}
