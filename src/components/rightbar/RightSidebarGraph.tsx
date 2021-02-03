import React, { useContext, useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { withRouter } from 'react-router';
import RSCloneServiceContext from '../rsCloneServiceContext';

const RightSidebarGraph = ({ location: { pathname } }: {location: {pathname: string}}) => {
  const service = useContext(RSCloneServiceContext);
  const [noteData, setNoteData] = useState<{}>();

  useEffect(() => {
    const fetchNote = async () => {
      if (pathname) {
        // @ts-ignore
        const title = /[^/]*$/.exec(`${pathname}`)[0];
        const data = await service.getNoteByTitle(title);
        const nodes = [{
          id: data.DATA.title,
          label: data.DATA.title,
        }];

        if (data.DATA.parents) {
          data.DATA.parents.forEach((parent: any) => {
            nodes.push({
              id: parent.pageLink,
              label: parent.pageLink,
            });
          });
        }

        const edges = data.DATA.parents.map((parent: any) => ({
          from: data.DATA.title,
          to: parent.pageLink,
        }));
        const graphData = { nodes, edges };

        setNoteData(graphData);
      }
    };
    fetchNote();
  }, []);

  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
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
    <>
      {
        noteData && (
        <Graph
          graph={noteData}
          options={options}
        />
        )
      }
    </>
  );
};

export default withRouter(RightSidebarGraph);
