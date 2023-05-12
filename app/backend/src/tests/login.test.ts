import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import usersModelSequelize from '../database/models/Users';
import { userValid, userPasswordInvalid } from './mocks/userMock';

import { app } from '../app';
import { generateToken } from '../utils/auth/jwtAuthorization';

chai.use(chaiHttp);

const { expect } = chai;

describe('login router', () => {
  afterEach(() => {
    sinon.restore();
  })
 
describe('POST /login', () => {

  it('POST /login passando email e senha corretos', async () => {
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(
        userValid as unknown as usersModelSequelize);

      const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.equal(undefined);
  });
  it('POST /login passando email inválido', async () => {
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(undefined);

      const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'kkkkkkkkkk',
        password: 'thiagoVidaLoka'
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Invalid email or password');
  });
  it('POST /login senha inválida', async () => {
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(undefined);

      const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'juanzinVidaLoka@gmail.com',
        password: '123'
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Invalid email or password');
  });
  it('POST /login senha passada no body for diferente da senha do Banco de Dados', async () => {
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(userValid as unknown as usersModelSequelize);

      const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '1234568'
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Invalid email or password');
  });

});

describe('GET /login/role', () => {
  it('GET /login/role passando token válido', async () => {
    const token = generateToken({ id: userValid.id });
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(userValid as unknown as usersModelSequelize);

      const response = await chai.request(app)
      .get('/login/role')
      .set('authorization', token);

      expect(response.status).to.be.equal(200);
      expect(response.body.role).to.be.equal('admin');
  }
  );

  it('GET /login/role passando token inválido', async () => {
    sinon
      .stub(usersModelSequelize, 'findOne')
      .resolves(userValid as unknown as usersModelSequelize);

      const response = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'qualquercoisa');

      expect(response.status).to.be.equal(401);
    
  }
  );
});


  
});