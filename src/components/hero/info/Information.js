import React from 'react';
import mediator from '../../../mediator';
import { connect } from 'react-redux';

function select(state) {
  return { hero: state.hero };
}

export default connect(select)(({ hero }) => {
  const tableExperienceItem = mediator.storage.tableExperience
    .find((item) => item.experience > hero.experience);

  return (
    <div className="uk-panel uk-panel-box">
      <h3 className="uk-panel-title">Information</h3>
      <div className="uk-grid">
        <div className="uk-width-5-10">Wins</div>
        <div className="uk-width-5-10">{hero.numberOfWins}</div>

        <div className="uk-width-5-10">Losses</div>
        <div className="uk-width-5-10">{hero.numberOfLosses}</div>

        <div className="uk-width-5-10">Draws</div>
        <div className="uk-width-5-10">{hero.numberOfDraws}</div>

        <div className="uk-width-5-10 uk-margin-small-top">Experience</div>
        <div className="uk-width-5-10 uk-margin-small-top">
          {hero.experience} / {tableExperienceItem.experience}
        </div>
      </div>
    </div>
  );
});
