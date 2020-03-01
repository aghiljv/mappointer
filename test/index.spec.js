import { mount } from '@vue/test-utils'
import index from '@/pages/index'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}))

describe('index.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(index)
  })

  test('index test', () => {
    expect(wrapper).toBeTruthy()
  })
})
