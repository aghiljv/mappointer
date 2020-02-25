import { shallowMount } from '@vue/test-utils'
import Layout from '@/components/Map/Layout'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}))

describe('Layout.vue', () => {

  test('Passcoords test', () => {
    const wrapper = shallowMount(Layout)
    wrapper.vm.passCoords([
      [45, 34],
      [78, 23]
    ])
    expect(wrapper.vm.coordinates).toEqual([
      [45, 34],
      [78, 23]
    ])
  })

  test('PassDistance test', () => {
    const wrapper = shallowMount(Layout)
    wrapper.vm.passDistance(314.40)
    expect(wrapper.vm.distance).toBe(314.40)
  })
})
