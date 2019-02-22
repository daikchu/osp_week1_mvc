import { Entity } from './entity.interface';

export interface FileResponse extends Entity {
    url? :string;
    fileName? :string;
    fileContenType? :string;
    status? :boolean;
}