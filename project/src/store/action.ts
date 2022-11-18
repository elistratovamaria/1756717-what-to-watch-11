import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Films } from '../types/films';

export const changeGenre = createAction('films/changeGenre', (genre: string) => ({
  payload: genre,
}));

export const setFilms = createAction('films/setFilms', (films: Films) => ({
  payload: films,
}));

export const setFilmsInListAmount = createAction('films/setFilmsInListAmount');

export const resetFilmsInListAmount = createAction('films/resetFilmsInListAmount');

export const loadFilms = createAction<Films>('data/loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
