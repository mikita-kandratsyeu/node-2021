import { Model, Optional } from 'sequelize';

type PermissionType = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
  id: string;
  name: string;
  permissions: PermissionType[];
}

export interface IGroupCreationInstance extends Optional<IGroup, 'id'> {}

export interface IGroupInstance
  extends Model<IGroup, IGroupCreationInstance>,
    IGroup {}
