import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { mockFilm, mockReviews } from '../../mocks/mocks';
import FilmTabs from './film-tabs';
import userEvent from '@testing-library/user-event';
import { getFormatDetailsFilmRunTime, getRatingLevel, getRowList } from '../../util';

const history = createMemoryHistory();
const film = mockFilm;
const reviews = mockReviews;
describe('Component: FilmTabs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <FilmTabs film={film} reviews={reviews} />
      </HistoryRouter>
    );


    expect(screen.getByText(/Overview/)).toBeInTheDocument();
    expect(screen.getByText(/Details/)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
  });

  it('should show overview when user click the link', async () => {

    render(
      <HistoryRouter history={history}>
        <FilmTabs film={film} reviews={reviews} />
      </HistoryRouter>
    );

    const ratings = `${film.scoresCount} ratings`;
    const director = `Director: ${film.director}`;
    const starring = `Starring: ${getRowList(film.starring)} and other`;

    await userEvent.click(screen.getByText(/Overview/));

    expect(screen.getByText(film.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(getRatingLevel(film.rating))).toBeInTheDocument();
    expect(screen.getByText(ratings)).toBeInTheDocument();
    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(director)).toBeInTheDocument();
    expect(screen.getByText(starring)).toBeInTheDocument();
  });

  it('should show details when user click the link', async () => {

    render(
      <HistoryRouter history={history}>
        <FilmTabs film={film} reviews={reviews} />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText(/Details/));

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Released/)).toBeInTheDocument();
    expect(screen.getByText(film.director)).toBeInTheDocument();
    expect(screen.getByText(getFormatDetailsFilmRunTime(film.runTime))).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released.toString())).toBeInTheDocument();
  });

  it('should show reviews when user click the link', async () => {

    render(
      <HistoryRouter history={history}>
        <FilmTabs film={film} reviews={reviews} />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText(/Reviews/));

    expect(screen.getAllByTestId('review').length).toBe(reviews.length);
  });
});
