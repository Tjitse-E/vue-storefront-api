import {expect} from 'chai'
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from 'config'

chai.use(chaiHttp);

describe('Testing mail service token endpoint', () => {

  it('should return token and status 200', async () => {
    const host = config.get('server.host')
    const port = config.get('server.port')
    const response = await tokenRequest(host, port)
    const token = response.body.result

    expect(response.body.code).to.equal(200)
    expect(typeof token === "string").to.equal(true)
  })
})

describe('Testing mail service send-email endpont', () => {

  it('should return not in whitelist and status 500', async () => {

    const host = config.get('server.host')
    const port = config.get('server.port')
    const tokenResponse = await tokenRequest(host, port);
    const token = tokenResponse.body.result

    const mailResponse = await chai.request(`${host}:${port}`)
      .post('/api/ext/mail-service/send-email')
      .send({
        'token': token,
        'sourceAddress': 'not-in-whitelist@vuestorefront.io',
        'targetAddress': 'not-in-whitelist@vuestorefront.io',

      })

    expect(mailResponse.body.code).to.equal(500, 'Expecting code 500 response')
    expect(mailResponse.body.result).to.equal(
      'Target email address (not-in-whitelist@vuestorefront.io) is not from the whitelist!',
      'Expecting target email address error'
    )
  })

})

/**
 * @param host : string
 * @param port : number
 */
async function tokenRequest(host, port) {
  return await chai.request(`${host}:${port}`)
    .get('/api/ext/mail-service/get-token')
}


