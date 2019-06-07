import {expect} from 'chai'
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from 'config'

chai.use(chaiHttp);

describe('Mail service token request', () => {

  it('should return token and status 200', async () => {
    const host = config.get('server.host')
    const port = config.get('server.port')
    const response = await chai.request(`${host}:${port}`)
      .get('/api/ext/mail-service/get-token')
    const token = response.body.result

    expect(response.body.code).to.equal(200)
    expect(typeof token === "string").to.equal(true)
  })

  /*
  it('should return token and status 200', async () => {

    const host = config.get('server.host')
    const port = config.get('server.port')
    const tokenResponse = await chai.request(`${host}:${port}`)
      .get('/api/ext/mail-service/get-token')
    const token = tokenResponse.body.result

    const mailResponse = await chai.request(`${host}:${port}`)
      .post('/api/ext/mail-service/send-email')
      .send({
        'token': token
      })

    expect(mailResponse.body.code).to.equal(200)
  })
  */
})


