import { mount } from '@vue/test-utils'
import MapHolder from '@/components/Map/MapHolder'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}))

describe('MapHolder.vue', () => {

  test('Emit test', () => {
    const wrapper = mount(MapHolder)
    wrapper.vm.$emit('newDistance', 314.40);
    expect(wrapper.emitted().newDistance).toBeTruthy()
  })
})
