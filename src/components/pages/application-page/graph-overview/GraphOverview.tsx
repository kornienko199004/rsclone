/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import './graphOverview.scss';
import NoteGraph from 'react-graph-network';
import { withRouter } from 'react-router-dom';
import RSCloneServiceContext from '../../../rsCloneServiceContext/index';
import Node from './Node';

export interface ModificationNote {
  _id: string;
  modified_on: string;
  modified_by: null | string;
  modification_note: null | string;
}
export interface Note {
  _id: string;
  title: string;
  body: object;
  parents: Array<object>;
  modification_notes: [ModificationNote];
  owner: string;
  __v: number;
}

export const getNodes = async (res: Note[]) => {
  const nodes: {
    id: string;
    title: string;
  }[] = await res.map((note: Note) => ({
    id: note._id,
    title: note.title,
  }));
  const links: any = [];
  res.map((note: Note) => {
    const thisId = note._id;
    return note.parents.forEach((parent: any) => links.push({
      source: thisId,
      target: parent.id,

    }));
  });
  return ({
    nodes,
    links,
  });
};

const Graph = () => {
  const [notes, setNotes]: any = useState(null);
  const service = useContext(RSCloneServiceContext);

  useEffect(() => {
    const getInfo = async () => {
      const res = await service.getNotes();
      const graphData = await getNodes(res.DATA);
      setNotes(graphData);
    };
    getInfo();
  }, []);

  return (
    <div className="graph-overview" style={{ height: '80vh' }}>
      {notes && (
        <NoteGraph
          NodeComponent={Node}
          nodeDistance={800}
          distance={50}
          zoomDepth={1}
          hoverOpacity={0.3}
          enableDrag
          pullIn={false}
          data={notes}
          id="graph"
        />
      )}
    </div>
  );
};
export default withRouter(Graph);
