import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { generateAst, getHtmlMarkup } from '../../../../helpers/notes.helper';

function ParentsListItem(props: any) {
  const { link } = props;

  // let parents: null | any[] = null;
  const [showNestedPages, toggleNestedPagesVisibility] = useState(true);

  const content = link.content
    .map((
      row: { value: string },
    ) => (
      <div className="parents-list__row" key={shortid()}>
        <span className="open-page__wrapper">
          <span className="open-page" />
        </span>
        {getHtmlMarkup(generateAst(row.value))}
      </div>
    ));
  const markup = (
    <div className="parents-list__link">
      <h4 className="parents-list__title">
        <button
          type="button"
          className="nested-pages-button"
          onClick={() => { toggleNestedPagesVisibility(!showNestedPages); }}
        >
          {showNestedPages ? (
            <ArrowDropDown fontSize="small" htmlColor="#000" />
          ) : (
            <ArrowRight fontSize="small" htmlColor="#000" />
          )}
        </button>
        <Link className="page-link" key={shortid()} to={`/app/note/${link.pageLink}`}>{link.pageLink}</Link>
      </h4>
      <div
        className={`parents-list__children ${
          showNestedPages ? 'parents-list__children--show' : 'parents-list__children--hidden'
        }`}
      >
        {content}
      </div>
    </div>
  );

  return (
    markup
  );
}

export default ParentsListItem;
