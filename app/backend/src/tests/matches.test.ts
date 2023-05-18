import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import matchesModelSequelize from '../database/models/Matches';
import Matches from '../database/models/Matches';
import { matches, matcheRequest } from './mocks/matchesMock';

import { app } from '../app';
import { generateToken } from '../utils/auth/jwtAuthorization';

chai.use(chaiHttp);

const { expect } = chai;

describe('matches router', () => {
  afterEach(() => {
    sinon.restore();
  })
 

  it('GET /matches', async () => {
    sinon
      .stub(matchesModelSequelize, 'findAll')
      .resolves(
        matches as unknown as Matches[]);

      const response = await chai.request(app)
      .get('/matches')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matches);
  });

  it('POST /matches', async () => {

    sinon
      .stub(matchesModelSequelize, 'create')
      .resolves({
        id: 49,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as unknown as Matches);

      const token = generateToken({id: 1})

      const response = await chai.request(app)
      .post(`/matches`)
      .set('Authorization', token)
      .send(matcheRequest)

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(
        {
          id: 49,
          homeTeamId: 16,
          homeTeamGoals: 2,
          awayTeamId: 8,
          awayTeamGoals: 2,
          inProgress: true,
        }
        );
  }
  );
});
