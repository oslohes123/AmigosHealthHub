import test from 'ava'
import { type ExecutionContext } from 'ava'
import fetchMock from 'fetch-mock'
import brandedSearch from '../../../../../utils/Food/searches/brandedSearch'
import { baseUrl } from '../../../../../constants'
import authHeaders from '../../../../../utils/Food/searches/headersObject'

test.beforeEach(() => {
  fetchMock.reset()
})

test.serial('brandedSearch returns expected data', async (t) => {
  const nixItemId = '123'
  const expectedData = { data: 'test data' }

  fetchMock.get(`${baseUrl}search/item?nix_item_id=${nixItemId}`, {
    status: 200,
    body: expectedData,
    headers: authHeaders
  })

  const result = await brandedSearch(nixItemId)

  t.deepEqual(result, expectedData)
})

test.serial('brandedSearch throws error on non-200 response', async (t) => {
  const nixItemId = '123'

  fetchMock.get(`${baseUrl}search/item?nix_item_id=${nixItemId}`, {
    status: 500,
    headers: authHeaders
  })

  await t.throwsAsync(async () => {
    await brandedSearch(nixItemId)
  })
})
