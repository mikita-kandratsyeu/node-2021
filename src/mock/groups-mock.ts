import { IGroup } from '../data-models';

const groupsMock: IGroup[] = [
  {
    id: '111',
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: '222',
    name: 'Managers',
    permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: '333',
    name: 'Customers',
    permissions: ['READ', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: '444',
    name: 'Users',
    permissions: ['READ', 'SHARE'],
  },
  {
    id: '555',
    name: 'Moderators',
    permissions: ['READ', 'DELETE'],
  },
];

export default groupsMock;
