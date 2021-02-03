/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import './graphOverview.scss';
import Graph from 'react-graph-vis';
import { Redirect, withRouter } from 'react-router-dom';
import RSCloneServiceContext from '../../../rsCloneServiceContext/index';
import { toggleLoader } from '../../../../store/actionsCreators/actionsCreators';
import { IInitialState } from '../../../../index';

interface ModificationNote {
  _id: string;
  modified_on: string;
  modified_by: null | string;
  modification_note: null | string;
}
interface Note {
  _id: string;
  title: string;
  body: object;
  parents: Array<object>;
  modification_notes: [ModificationNote];
  owner: string;
  __v: number;
}

const getNodes = async (res: Note[]) => {
  const nodes: {
    id: string;
    label: string;
  }[] = await res.map((note: Note) => ({
    id: note.title,
    label: note.title,
  }));
  const edges: {
    from: string;
    to: string;
  }[] = [];
  res.map((note: Note) => note.parents.forEach(async (parent: any) => {
    edges.push({
      from: note.title,
      to: parent.pageLink,
    });
  }));
  return ({
    nodes,
    edges,
  });
};

const height = ((window.innerHeight || document.documentElement.clientHeight
|| document.body.clientHeight) - 100).toString();

// eslint-disable-next-line no-unused-vars
const myGraph = (props: { toggleLoader(isLoading: boolean): void }) => {
  const [notes, setNotes] = useState(null as any);
  const [link, setLink] = useState('');
  const service = useContext(RSCloneServiceContext);
  const sidebarIsOpen = useSelector<IInitialState>((state) => state.sidebarIsOpen);

  if (!notes) {
    props.toggleLoader(true);
  }

  useEffect(() => {
    const getInfo = async () => {
      const res = await service.getNotes();
      const graphData = await getNodes(res.DATA);
      setNotes(graphData);
      props.toggleLoader(false);
    };
    getInfo();
  }, []);
  const width = window.innerWidth || document.documentElement.clientWidth
    || document.body.clientWidth;
  const graphWidth = sidebarIsOpen ? width - 270 : width;
  const marginLeft = sidebarIsOpen ? 270 : 0;

  const options = {
    autoResize: true,
    height: `${height}px`,
    width: `${graphWidth}px`,
    locale: 'en',
    nodes: {
      color: '#3f51b5',
      fixed: false,
      font: '18px BlinkMacSystemFont #000000',
      shape: 'dot',
    },
    edges: {
      arrows: {
        to: {
          enabled: false,
          type: 'bar',
        },
      },
      color: 'black',
      scaling: {
        label: true,
      },
    },
    layout: {
      hierarchical: true,
    },
  };

  return (
    (link)
      ? <Redirect to={link} />
      : (
        notes && (
          <div
            className="container"
            style={{
              marginLeft: `${marginLeft}px`,
            }}
          >
            <Graph
              graph={notes}
              options={options}
              events={{
                click: (event: { nodes: any; edges: any; }) => {
                  const { nodes } = event;
                  if (nodes[0]) {
                    setLink(`/app/note/${nodes[0]}`);
                  }
                },
              }}
            />
          </div>
        )
      )
  );
};

const mapDispatchToProps = {
  toggleLoader,
};

// export default withRouter(myGraph);
export default withRouter(connect(null, mapDispatchToProps)(myGraph));
