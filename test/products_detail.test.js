const app = require('../app');
const request = require('supertest');

describe('Product Detail API TEST', () => {
  test('successWithParameters', async () => {
    await request(app)
      .get('/products/1')
      .set('Accept', 'application/json')
      .expect(200, {
        message: 'SUCCESS',
        result: [
          {
            id: 1,
            name: '토마토 바질 크림 수프',
            description:
              '못할 무엇을 천고에 부패를 방황하였으며, 있다. 없는 속에 사랑의 이상 타오르고 듣는다. 하였으며, 같지 뜨고, 인생의 이상은 유소년에게서 무엇을 피고 풍부하게 있다. 동산에는 들어 찾아 소금이라 그들의 목숨이 인생에 것이 없는 교향악이다. 끓는 더운지라 따뜻한 것이다. 그들의 그것은 행복스럽고 크고 튼튼하며, 시들어 군영과 때에, 봄바람이다. 피어나기 있을 행복스럽고 청춘이 속에 든 무엇이 얼마나 인간은 것이다. 그것은 무엇을 용기가 실현에 없으면, 우리 그들의 사막이다. 구하지 새가 구할 있는 고행을 이상, 봄바람이다.',
            method: 1,
            createdAt: '2022-04-14T04:28:02.020Z',
            updatedAt: '2022-04-14T04:28:02.020Z',
            category: 1,
          },
        ],
      });
  });
});
