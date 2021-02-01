import React from 'react';
import shortid from 'shortid';
import { INote, IParent } from '../../../models/notes.model';
import './parentsList.scss';
import ParentsListItem from './parentsListItem/ParentsListItem';

function ParentsList(props: any) {
  const { note } = props;

  let parents: null | any[] = null;

  if ((note as INote) && (note as INote).parents) {
    parents = ((note as INote).parents as IParent[])
      .map((item: IParent) => <ParentsListItem key={shortid()} link={item} />);
  }

  return (
    <div className="parents-list">
      {parents && parents.length > 0
        ? (
          <h3 className="title">
            {(parents && parents.length) || 0}
            Linked References
          </h3>
        ) : ''}
      {parents}
    </div>
  );
}

export default ParentsList;
