import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { IAstElement } from '../models/notes.model';

const getDayTitle = (): string => moment()
  .format('MMMM Do, YYYY')
  .toString();

const getLinkContent = (str: string) => {
  if (!str) {
    return str;
  }
  return str.replace(/\[\[/, '').replace(/\]\]/, '');
};

const generateAst = (str: string) => {
  const iter = (subStr: string, acc: any[]): IAstElement[] => {
    if (subStr.length === 0) {
      return acc;
    }

    const linkStart: number = subStr.search(/\[\[/);

    if (linkStart === -1) {
      return iter('', [...acc, { type: 'text', content: subStr }]);
    }

    const linkEnd: number = subStr.search(/\]\]/);
    if (linkEnd === -1) {
      return iter('', [...acc, { type: 'text', content: subStr }]);
    }

    let newAcc = [...acc];
    if (linkStart !== 0) {
      newAcc = [
        ...acc,
        { type: 'text', content: subStr.substring(0, linkStart) },
      ];
    }

    return iter(subStr.substring(linkEnd + 2), [
      ...newAcc,
      { type: 'link', content: subStr.substring(linkStart, linkEnd + 2) },
    ]);
  };
  return iter(str, []);
};

const getHtmlMarkup = (ast: IAstElement[]) => {
  if (ast.length === 0) {
    // React.createElement('span');
    return React.createElement('span');
  }
  return ast.map((item: IAstElement) => {
    if (item.type === 'text') {
      return React.createElement('span', {
        key: shortid(),
      },
      item.content);
      // return (<span key={shortid()}>{item.content}</span>);
    }
    return React.createElement(Link, {
      key: shortid(),
      className: 'page-link',
      to: `/app/note/${getLinkContent(item.content)}`,
    },
    `[[${getLinkContent(item.content)}]]`);
  });
};

// eslint-disable-next-line import/prefer-default-export
export {
  getDayTitle, generateAst, getLinkContent, getHtmlMarkup,
};
