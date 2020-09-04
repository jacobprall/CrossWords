import { fetchNewGame, updateGameDetails, clearGameState } from '../../actions/game_actions';
import { connect } from 'react-redux';
import Grid from './grid';

const mapStateToProps = ({ game: { active, answerHistory, clueHistory }, session: { activeGame } }) => ({
  game: active[activeGame],
  gameId: activeGame,
  answerHistory,
  clueHistory,
});

const mapDispatchToProps = dispatch => ({
  fetchNewGame: () => dispatch(fetchNewGame()),
  updateGameDetails: (updateFields) => dispatch(updateGameDetails(updateFields)),
  clearGameState: () => dispatch(clearGameState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);