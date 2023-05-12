import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teams } from './mocks/teamMock';
import teamModelSequelize from '../database/models/Teams';

import { app } from '../app';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('teams router', () => {
  afterEach(() => {
    sinon.restore();
  })
 

  it('GET /teams', async () => {
    sinon
      .stub(teamModelSequelize, 'findAll')
      .resolves(
        teams as unknown as Teams[]);

      const response = await chai.request(app)
      .get('/teams')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teams);
  });

  it('GET /teams/:id', async () => {
    const id = 1;
    sinon
      .stub(teamModelSequelize, 'findOne')
      .resolves(
        teams[0] as unknown as Teams);

      const response = await chai.request(app)
      .get(`/teams/${id}`)

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teams[0]);
  }
  );
});
