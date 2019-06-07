import {expect} from 'chai'
import 'chai'
import 'chai-http'
import 'mocha'

import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);


describe('Mail service token request', () => {

  it('should return md5 token and status 200', async () => {

    let response = await chai.request('http://localhost:8080')
      .get('/api/ext/mail-service/get-token')

    expect(response.body.code).to.equal(200)
    expect(typeof response.body.result === "string").to.equal(true)

  })

})
